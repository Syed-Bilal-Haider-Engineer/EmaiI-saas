import React from 'react'
import Header from '@/shared/wedgets/header/header'
import Banner from './features/banner'
import Branding from './features/branding'
import Benefits from './features/benefits'
import FeatureHighlight from './features/feature.heightlights'
import Pricing from './features/Pricing'
import Footer from '@/shared/wedgets/footer'
function Home() {
    return (
        <>
            <Header />
            <Banner/>
            <Branding/>
            <Benefits/>
            <FeatureHighlight/>
            <Pricing/>
            <Footer/>
        </>
    )
}

export default Home
