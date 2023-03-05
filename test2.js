import Head from 'next/head'
import WhatsApp from '@/components/whatsApp'
import Sidebar from '@/components/dashboard/user/navigation/sidebar/sidebar'
import Navbar from '@/components/dashboard/user/navigation/navbar/navbar'
import Wallet from '@/components/dashboard/user/content/wallet'
import { useState, useEffect } from 'react';
import { auth, FireApp } from "@/firebase/firebase";
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

const db = getFirestore(FireApp);

export default function WalletPage() {
  const [user, setUser] = useState(null);
  const [btc, setBTC] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [fundRate, setFundRate] = useState(0);

  const fetch = require('node-fetch');
  const url = 'https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '388ed44c88msh4f3fcabbe8a0277p13efe0jsnb86a7bf6dab5',
      'X-RapidAPI-Host': 'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const profileRef = doc(db, 'users', user.email);
      getDoc(profileRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser(docSnapshot.data());
            fetch(url, options)
              .then(res => res.json())
              .then(json => setBTC(json))
          } else {
            console.log('Profile not found');
          }
        })
        .catch((error) => {
          console.log('Error getting profile:', error);
        });
    }
  }, []);

  useEffect(() => {
    const getUsersData = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      let dTotal = 0;
      let wTotal = 0;

      usersSnapshot.forEach((doc) => {
        const dashboard = doc.data().dashboard;
        for (const i in dashboard.deposit) {
          const deposit = parseInt(dashboard.deposit.balance);
          dTotal += deposit;
        }
        for (const i in dashboard.withdraw) {
          const withdraw = parseInt(dashboard.withdraw.balance);
          wTotal += withdraw;
        }
      });
      setFundRate((dTotal / 3) / (wTotal / 3))
      setTotalBalance((dTotal / 3) + (wTotal / 3));
    };
    getUsersData();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Tradeby allows you to trade on MT4 or MT5 with a unique subscription model. One low monthly fee for 0 commissions, tight spreads and other exclusive benefits." />
        <meta name="keywords" content="blockchain, web3, blockchain technology, trading, broker" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/x-icon" href="/logo.png" />
        <meta name="author" content="TradeBy" />
        <title>Dashboard</title>

        <meta property="og:title" content="TradeBy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="1277" />
        <meta property="og:image:height" content="473" />
        <meta property="og:url" content="https://tradeby.org" />
        <meta property="og:description" content="Tradeby allows you to trade on MT4 or MT5 with a unique subscription model. One low monthly fee for 0 commissions, tight spreads and other exclusive benefits." />
        <meta property="og:site_name" content="TradeBy" />
        
      </Head>

      <main className="d-flex" style={{ paddingTop: "6.5rem" }}>
        <Sidebar />
        <Navbar />
        <Wallet user={user} btc={btc} totalBalance={totalBalance} fundRate={fundRate} />
      </main>

      <WhatsApp />
    </>
  )
}
