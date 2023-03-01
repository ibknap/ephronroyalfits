import { Warning2 } from 'iconsax-react';
import styles from '@/components/help_center/HelpCenter.module.css'
import Link from 'next/link';

export default function HelpCenter() {
    // toggle live chat 
    const liveChat = () => {
        if (typeof window !== 'undefined' && window.Tawk_API) {
            window.Tawk_API.toggle();
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center primary">
                        <Warning2 size="200" variant="Bold" />
                    </div>
                    <h1 className="text-center primary">Help Center</h1>
                </div>

                <div className="row mb-5">
                    <div className="col-12 text-center grey_dark">
                        <h3>Hello there, what can we help with?</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className={`m-2 ${styles.help_card} shadow-sm`}>
                            <Link href="help_center/about" as="help_center/about">
                                <h4>About Us</h4>
                                <p>
                                    Get to know more about us and how we work at NEFB.
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className={`m-2 ${styles.help_card} shadow-sm`}>
                            <Link href="help_center/how_to_donate" as="help_center/how_to_donate">
                                <h4>How To Donate</h4>
                                <p>
                                    Learn Step-by-Step process of donating on NEFB.
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className={`m-2 ${styles.help_card} shadow-sm`}>
                            <Link href="help_center/contact" as="help_center/contact">
                                <h4>Contact Us</h4>
                                <p>
                                    Want to send us a message or get on a call with one of the staffs?.
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className={`m-2 ${styles.help_card} shadow-sm`}>
                            <a href="#!" onClick={liveChat}>
                                <h4>Talk To Live Staffs</h4>
                                <p>
                                    Talk to a live staffs from the chat box at the bottom right of your device.
                                </p>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className={`m-2 ${styles.help_card} shadow-sm`}>
                            <Link href="help_center/privacy" as="help_center/privacy">
                                <h4>Privacy</h4>
                                <p>
                                    View our current privacy policies, dos&apos; and donts&apos;.
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className={`m-2 ${styles.help_card} shadow-sm`}>
                            <Link href="help_center/terms" as="help_center/terms">
                                <h4>Terms</h4>
                                <p>
                                    Take a look into your terms of conduct and use.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
