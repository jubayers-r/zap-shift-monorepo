import React from 'react';
import Banner from '../Banner/Banner';
import OurServicesSection from '../OurServicesSection/OurServicesSection';
import TrustedCompaniesSection from '../TrustedCompaniesSection/TrustedCompaniesSection';
import BenefitsSection from '../BenefitsSection/BenefitsSection';
import BannerCard from '../Banner2/BannerCard';

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServicesSection/>
            <TrustedCompaniesSection/>
            <BenefitsSection/>
            <BannerCard/>
        </div>
    );
};

export default Home;