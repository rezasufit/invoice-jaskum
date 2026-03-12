import React from 'react'

import wImg1 from '../../images/work/1.png'
import wImg2 from '../../images/work/2.png'
import wImg3 from '../../images/work/3.png'

const WorkSection = (props) => {
    return (
        <section className="wpo-work-section section-padding">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-5">
                        <div className="wpo-section-title">
                            <h2>Cara pemesanan yang praktis</h2>
                            <p>Nikmati kemudahan pemesanan dengan sistem yang 
                                kami rancang agar cepat, aman, dan nyaman untuk Anda.</p>

                        </div>
                    </div>
                </div>
                <div className="wpo-work-wrap">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="wpo-work-item">
                                <div className="wpo-work-img">
                                    <img src={wImg1} alt=""/>
                                </div>
                                <div className="wpo-work-text">
                                    <h2>Pesan Secara Online</h2>
                                </div>
                                <div className="visible-text">
                                    <span>1</span>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="wpo-work-item">
                                <div className="wpo-work-text">
                                    <h2>Team kami<br/> akan datang</h2>
                                </div>
                                <div className="visible-text">
                                    <span>2</span>
                                </div>
                                <div className="wpo-work-img">
                                    <img src={wImg2} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="wpo-work-item">
                                <div className="wpo-work-img">
                                    <img src={wImg3} alt=""/>
                                </div>
                                <div className="wpo-work-text">
                                    <h2>Rumah bersih & nyaman</h2>
                                </div>
                                <div className="visible-text">
                                    <span>3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkSection;