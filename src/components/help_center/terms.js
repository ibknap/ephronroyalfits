import styles from '@/components/help_center/HelpCenter.module.css'
import { Document } from 'iconsax-react';
import Link from 'next/link';

export default function Terms() {
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 text-center grey_dark">
                        <Document size="300" variant="Bold" />
                    </div>
                    <div className="text-center grey_dark">
                        <h3>Terms</h3>
                        <p>Pending content...</p>
                    </div>
                </div>
            </div>
        </>
    )
}
