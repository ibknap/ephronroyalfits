import styles from '@/components/help_center/HelpCenter.module.css'
import { Lock } from 'iconsax-react';
import Link from 'next/link';

export default function Privacy() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center grey_dark">
                        <Lock size="300" variant="Bold" />
                    </div>
                    <div className="text-center grey_dark">
                        <h3>Privacy</h3>
                        <p>Pending content...</p>
                    </div>
                </div>
            </div>
        </>
    )
}
