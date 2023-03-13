import { People } from 'iconsax-react';

export default function About() {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-12 text-center grey_dark">
                            <div className="d-flex">
                                <People size="46" className="mx-1" variant="Bold" />
                                <h1 className="mx-1">About Us</h1>
                            </div>
                        </div>

                        <div className="col-12 mt-5">
                            <div>
                                <p>
                                    North East Food Bank is an indigenous food bank that seeks to mitigate hunger and malnutrition
                                    among vulnerable populations in the northeastern part of Nigeria.
                                </p>
                            </div>

                            <div className="my-5">
                                <h4>What we do</h4>
                                <p>
                                    The Northeast Food Bank is a program of the Big Family 360 Foundation that aims to increase
                                    access to food security and lessen hunger and malnutrition among vulnerable groups in the BAY
                                    States (Borno, Adamawa, and Yobe). The project aims to supply 1,000 undernourished children
                                    and 5,000 households headed by women and children with food and non-food items each month.
                                </p>

                                <p>
                                    NEFB advances innovative solutions through several integrated channels. It provides food
                                    security, nutrition education, and innovative programs proved to reduce food insecurity.
                                    Focusing strategically on ending childhood hunger, this program empowers families and broadens
                                    access to healthy and affordable food.
                                </p>

                                <h6>Strategy</h6>
                                <p>
                                    NEFB  works beyond immediate food assistance to address the underlying causes of food
                                    insecurities. We empower families with skills and tools to help them prepare healthy
                                    food on a budget. We educate others about food insecurity and advocate for policy
                                    changes on the state and federal levels. We provide innovative programs designed to
                                    improve the overall health of individuals and communities and create sustainable change.
                                </p>
                            </div>

                            <div className="mt-5">
                                <h4>How to help</h4>
                                <p>
                                    We rely on a network of growers, manufacturers, wholesalers, grocery stores, and individuals
                                    to donate food that we distribute to communities. Our partners include food pantries,
                                    restaurants, food donors, and individual and corporate bodies. Every dollar you give to
                                    help meets the immediate need for food and services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
