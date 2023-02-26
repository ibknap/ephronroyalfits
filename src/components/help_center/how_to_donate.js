import styles from '@/components/help_center/HelpCenter.module.css'
import { ShoppingCart } from 'iconsax-react';
import Link from 'next/link';

export default function HowToDonate() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center grey_dark">
                        <ShoppingCart size="300" variant="Bold" />
                    </div>
                    <div className="text-center grey_dark">
                        <h3>How To Donate</h3>
                        <p>Pending content...</p>
                    </div>
                </div>
            </div>
        </>
    )
}
