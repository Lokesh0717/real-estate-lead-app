import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Add a document to a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Data to add
 * @returns {Promise} Document reference
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise} Array of documents
 */
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: documents };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise} Document data
 */
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Document not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Object} data - Data to update
 * @returns {Promise}
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise}
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Query documents with filters
 * @param {string} collectionName - Name of the collection
 * @param {Array} filters - Array of filter objects [{field, operator, value}]
 * @param {string} orderByField - Field to order by
 * @param {string} orderDirection - 'asc' or 'desc'
 * @param {number} limitCount - Maximum number of documents
 * @returns {Promise} Array of documents
 */
export const queryDocuments = async (
  collectionName,
  filters = [],
  orderByField = null,
  orderDirection = 'asc',
  limitCount = null
) => {
  try {
    let q = collection(db, collectionName);

    // Apply filters
    if (filters.length > 0) {
      filters.forEach((filter) => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
    }

    // Apply ordering
    if (orderByField) {
      q = query(q, orderBy(orderByField, orderDirection));
    }

    // Apply limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: documents };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Subscribe to real-time updates from a collection
 * @param {string} collectionName - Name of the collection
 * @param {Function} callback - Callback function that receives documents array
 * @param {string} orderByField - Field to order by (optional)
 * @param {string} orderDirection - 'asc' or 'desc' (default: 'desc')
 * @returns {Function} Unsubscribe function
 */
export const subscribeToCollection = (
  collectionName,
  callback,
  orderByField = 'createdAt',
  orderDirection = 'desc'
) => {
  try {
    console.log(`📡 Setting up Firestore subscription for collection: ${collectionName}`);
    let q = collection(db, collectionName);
    
    // Apply ordering if field is provided
    if (orderByField) {
      q = query(q, orderBy(orderByField, orderDirection));
      console.log(`📊 Ordering by: ${orderByField} (${orderDirection})`);
    }

    // Add error handling with timeout
    let hasCalled = false;
    const timeoutId = setTimeout(() => {
      if (!hasCalled) {
        console.error('⏱️ Firestore subscription timeout after 15 seconds');
        callback({ success: false, error: 'Connection timeout. Please check your internet connection and Firestore rules.' });
        hasCalled = true;
      }
    }, 15000); // 15 second timeout

    console.log('👂 Listening for Firestore updates...');
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        clearTimeout(timeoutId);
        if (!hasCalled) {
          hasCalled = true;
          console.log(`📥 Firestore snapshot received: ${querySnapshot.docs.length} documents`);
          const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback({ success: true, data: documents });
        } else {
          // Subsequent updates
          const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback({ success: true, data: documents });
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        if (!hasCalled) {
          hasCalled = true;
          console.error('❌ Firestore subscription error:', error);
          console.error('Error code:', error.code);
          console.error('Error message:', error.message);
          
          let errorMessage = 'Failed to connect to database';
          if (error.code === 'permission-denied') {
            errorMessage = 'Permission denied. Please check your Firestore security rules.';
          } else if (error.code === 'unavailable') {
            errorMessage = 'Firestore service unavailable. Please check your internet connection.';
          } else {
            errorMessage = error.message || 'Failed to connect to database';
          }
          
          callback({ success: false, error: errorMessage });
        }
      }
    );

    return () => {
      console.log('🔌 Unsubscribing from Firestore');
      clearTimeout(timeoutId);
      unsubscribe();
    };
  } catch (error) {
    console.error('❌ Error setting up subscription:', error);
    callback({ success: false, error: error.message });
    return () => {}; // Return empty unsubscribe function on error
  }
};

