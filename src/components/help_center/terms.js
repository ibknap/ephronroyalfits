import { ShieldSecurity } from 'iconsax-react';
import Link from 'next/link';

export default function Terms() {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-12 text-center grey_dark">
                            <div className="d-flex">
                                <ShieldSecurity size="46" className="mx-1" variant="Bold" />
                                <h1 className="mx-1">Terms and Conditions</h1>
                            </div>
                        </div>

                        <div className="col-12 mt-5">
                            <div className="mb-5">
                                <h4>Introduction</h4>
                                <p>
                                    These Website Standard Terms and Conditions written on this webpage shall manage your use of our website,
                                    North East Food Bank accessible at https://northeastfoodbank.org/. These Terms will be applied fully and
                                    affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions
                                    written in here. You must not use this Website if you disagree with any of these Website Standard Terms
                                    and Conditions. Minors or people below 18 years old are not allowed to use this Website.
                                </p>
                            </div>

                            <div className="mt-5">
                                <h4>Restrictions</h4>
                                <p>
                                    You are specifically restricted from all of the following:
                                </p>

                                <ul>
                                    <li>Publishing any Website material in any other media</li>
                                    <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
                                    <li>Publicly performing and/or showing any Website material</li>
                                    <li>Using this Website in any way that is or may be damaging to this Website</li>
                                    <li>Using this Website in any way that impacts user access to this Website</li>
                                    <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity</li>
                                    <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website</li>
                                    <li>Using this Website to engage in any advertising or marketing</li>
                                </ul>

                                <p>
                                    Certain areas of this Website are restricted from being access by you and Big Family 360 Foundation
                                    may further restrict access by you to any areas of this Website, at any time, in absolute discretion.
                                    Any user ID and password you may have for this Website are confidential and you must maintain
                                    confidentiality as well.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Your Content</h4>
                                <p>
                                    In these Website Standard Terms and Conditions, &apos;Your Content&apos; shall mean any audio, video text,
                                    images or other material you choose to display on this Website. By displaying Your Content, you
                                    grant Big Family 360 Foundation a non-exclusive, worldwide irrevocable, sub licensable license
                                    to use, reproduce, adapt, publish, translate and distribute it in any and all media.
                                </p>

                                <p>
                                    Your Content must be your own and must not be invading any third-party&apos;s rights. Big Family
                                    360 Foundation reserves the right to remove any of Your Content from this Website at any time without notice.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Your Privacy</h4>
                                <p>
                                    Please read <Link href="/help_center/privacy" target="_blank">Privacy Policy</Link>.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>No warranties</h4>
                                <p>
                                    This Website is provided &apos;as is,&apos; with all faults, and Big Family 360 Foundation express no
                                    representations or warranties, of any kind related to this Website or the materials contained
                                    on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Limitation of liability</h4>
                                <p>
                                    In no event shall Big Family 360 Foundation, nor any of its officers, directors and employees,
                                    shall be held liable for anything arising out of or in any way connected with your use of this
                                    Website whether such liability is under contract. Big Family 360 Foundation, including its
                                    officers, directors and employees shall not be held liable for any indirect, consequential or
                                    special liability arising out of or in any way related to your use of this Website.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Indemnification</h4>
                                <p>
                                    You hereby indemnify to the fullest extent Big Family 360 Foundation from and against
                                    any and/or all liabilities, costs, demands, causes of action, damages and expenses
                                    arising in any way related to your breach of any of the provisions of these Terms.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Severability</h4>
                                <p>
                                    If any provision of these Terms is found to be invalid under any applicable law, such
                                    provisions shall be deleted without affecting the remaining provisions herein.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Variation of Terms</h4>
                                <p>
                                    Big Family 360 Foundation is permitted to revise these Terms at any time as it sees fit,
                                    and by using this Website you are expected to review these Terms on a regular basis.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Assignment</h4>
                                <p>
                                    The Big Family 360 Foundation is allowed to assign, transfer, and subcontract its rights
                                    and/or obligations under these Terms without any notification. However, you are not allowed
                                    to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Entire Agreement</h4>
                                <p>
                                    These Terms constitute the entire agreement between Big Family 360 Foundation and you in relation
                                    to your use of this Website, and supersede all prior agreements and understandings.
                                </p>
                            </div>

                            <div className="mb-5">
                                <h4>Governing Law & Jurisdiction</h4>
                                <p>
                                    These Terms will be governed by and interpreted in accordance with the laws of the State of ng, and
                                    you submit to the non-exclusive jurisdiction of the state and federal courts located in ng for the
                                    resolution of any disputes.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
