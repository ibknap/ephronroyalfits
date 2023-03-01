import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';

export function getProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "products"), where('isHealth', '==', false), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toISOString()
                };
            });
            setProducts(data);
        });

        return () => { unsubscribe(); };
    }, []);

    return products;
}




