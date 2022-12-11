// @ts-nocheck

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import Buttons from '../components/Buttons/Buttons'
import GJNumbersView from '../components/GJNumbersView/GJNumbersView'
import Smile from '../components/Smile/Smile'
import NamedColors from '../components/NamedColors/NamedColors'
import WorldPopulation from '../components/WorldPopulation/WorldPopulation'

export const getServerSideProps = async () => {
  const bitstampData = await fetch('https://www.bitstamp.net/api/v2/ticker/')
    .then((res) => res.json())
    .catch((err) => console.log(err))

  const finexData = await fetch(
    'https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD'
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))

  const coinbaseEntireRes = await fetch(
    'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))

  const buttonsData = await fetch(
    'https://www.bitstamp.net/api/v2/trading-pairs-info/'
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))

  // Promise.all([bitstampRes, finexRes, coinbaseEntireRes, buttonsRes]).then(
  //   (values) => {

  //   }
  // )
  return {
    props: {
      bitstampData,
      coinbaseData: coinbaseEntireRes.data,
      finexData,
      buttonsData,
    },
  }
}

export const Context = React.createContext('BTC/USD')

export default function Home({
  buttonsData,
  bitstampData,
  coinbaseData,
  finexData,
}) {
  const [selectedPair, setSelectedPair] = useState('BTC/USD')

  const coinbaseLast = Number(coinbaseData.rates.USD)
  const bitstampUSD = bitstampData.find((obj) => {
    return obj.pair === 'BTC/USD'
  })
  const bitstampLast = Number(bitstampUSD.last)
  const finexLast = finexData[0][1]

  // const calculateAverageLast = () => {
  //   const average = (finexLast + bitstampLast + coinbaseLast) / 3
  //   return average
  // }

  //returns average of successful API calls or an error message
  const calculateAverageLast = (
    a: number,
    b: number,
    c: number
  ): number | string => {
    let array = []
    typeof a === 'number' ? array.push(a) : null
    typeof b === 'number' ? array.push(b) : null
    typeof c === 'number' ? array.push(c) : null
    const sum = array.reduce((a, b) => a + b, 0)
    const average = sum / array.length
    if (array.length > 0) {
      return average
    } else {
      return 'Data not available at this time'
    }
  }

  const averageLast = calculateAverageLast(
    finexLast,
    bitstampLast,
    coinbaseLast
  )

  // useEffect(() => {
  // console.log(buttonsData)
  // console.log(bitstampData)
  // console.log(coinbaseLast)
  // console.log(finexLast)
  // console.log(coinbaseLast)
  // console.log(bitstampUSD.last)
  // }, [])
  return (
    <Context.Provider value={[selectedPair, setSelectedPair]}>
      <div className={styles.container}>
        <Head>
          <title>Cryptomaina</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>WORK IN PROGRESS</h1>

        <main className={styles.main}>
          <section className={styles.averageTickerContainer}>
            {/* <h1>Average ticker values</h1> */}
            <h2>&rdquo;Last&rdquo; value for BTC/USD</h2>
            <p>{averageLast}</p>
          </section>
          <section className={styles.tradingPairsContainer}>
            <div className={styles.tradingPairsButtons}>
              <Buttons pairs={buttonsData} />
            </div>
            <GJNumbersView data={bitstampData} />
          </section>
        </main>

        <footer className={styles.footer}>
          {/* <Smile /> */}
          {/* <NamedColors /> */}
          <WorldPopulation />
        </footer>
      </div>
    </Context.Provider>
  )
}
