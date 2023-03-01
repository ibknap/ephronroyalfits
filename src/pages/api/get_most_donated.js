import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';

export default function getMostDonated() {
    const [mdProducts, setMdProducts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("numOfDonation", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toISOString()
                };
            });
            setMdProducts(data);
        });

        return () => { unsubscribe(); };
    }, []);

    return mdProducts;
}