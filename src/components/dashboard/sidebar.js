import { Box1, DirectInbox, Folder, Gift, Logout, Message, People, PresentionChart, Setting, User } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
    return (
        <div className="dashboard_sidebar shadow-sm">
            <nav class="d-flex flex-column">
                <div className="dashboard_sidebar_header">
                    <Image
                        src="/images/fav_logo_trans.png"
                        alt="logo"
                        className="rounded m-1"
                        width={43}
                        height={43}
                        priority
                    />
                    <div className="m-1 d-none d-lg-block d-flex flex-column">
                        NEFB Admin
                        <p className="text-muted">
                            <small>The food bank</small>
                        </p>
                    </div>
                </div>
                <Link href="/dashboard" as="/dashboard" className="dashboard_sidebar_item secondary">
                    <PresentionChart className="mx-2" />
                    <span className="d-none d-lg-inline">Dashboard</span>
                </Link>
                <Link href="/dashboard/products" as="/dashboard/products" className="dashboard_sidebar_item secondary">
                    <Box1 className="mx-2" />
                    <span className="d-none d-lg-inline">Products</span>
                </Link>
                <Link href="/dashboard/users" as="/dashboard/users" className="dashboard_sidebar_item secondary">
                    <People className="mx-2" />
                    <span className="d-none d-lg-inline">Users</span>
                </Link>
                <Link href="/dashboard/newsletters" as="/dashboard/newsletters" className="dashboard_sidebar_item secondary">
                    <Folder className="mx-2" />
                    <span className="d-none d-lg-inline">Newsletters</span>
                </Link>
                <Link href="/dashboard/contact_us" as="/dashboard/contact_us" className="dashboard_sidebar_item secondary">
                    <DirectInbox className="mx-2" />
                    <span className="d-none d-lg-inline">Contact Us</span>
                </Link>
                <Link href="/dashboard/donations" as="/dashboard/donations" className="dashboard_sidebar_item secondary">
                    <Gift className="mx-2" />
                    <span className="d-none d-lg-inline">Donations</span>
                </Link>
                <Link href="/dashboard/live_chat" as="/dashboard/live_chat" className="dashboard_sidebar_item secondary">
                    <Message className="mx-2" />
                    <span className="d-none d-lg-inline">Live Chat</span>
                </Link>
                <Link href="/dashboard/settings" as="/dashboard/settings" className="dashboard_sidebar_item secondary">
                    <Setting className="mx-2" />
                    <span className="d-none d-lg-inline">Settings</span>
                </Link>
                <Link href="/dashboard/profile" as="/dashboard/profile" className="dashboard_sidebar_item secondary">
                    <User className="mx-2" />
                    <span className="d-none d-lg-inline">Profile</span>
                </Link>
                <Link href="/dashboard/logout" as="/dashboard/logout" className="dashboard_sidebar_item secondary">
                    <Logout className="mx-2" />
                    <span className="d-none d-lg-inline">Logout</span>
                </Link>
            </nav>
        </div>
    )
}