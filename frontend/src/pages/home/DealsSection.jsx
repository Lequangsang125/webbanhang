import React from 'react'
import dealsImg from "../../assets/deals.png"
const DealsSection = () => {
    return (
        <section className='section__container deals__container'>
            <div className='deals__image'>
                <img src={dealsImg} alt="" />
            </div>
            <div className='deals__content'>
                <h5>get to 20% discount</h5>
                <h4>deal of this monthmonth</h4>
                <p>OKOKOKOKOKOKOKOKOKOKOKOJK</p>

                <div className='deals__countdown flex-wrap'>
                    <div className='deals__countdown__card'>
                        <h4>14</h4>
                        <p>ngay</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>20</h4>
                        <p>gio</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>15</h4>
                        <p>phut</p>
                    </div>
                    <div className='deals__countdown__card'>
                        <h4>05</h4>
                        <p>giay</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DealsSection
