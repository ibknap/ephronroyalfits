import Link from "next/link";
import { Information } from "iconsax-react";

export default function NeedAuth() {
  return (
    <div className="error-page-container">
      <div className="bg">
        <Information variant="Bulk" size={200} />
        <h5>You need to signed in</h5>

        <div className="mt-4">
          <Link
            href="/"
            className="btn btn-lg rounded-0 border-0 bg_primary white"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
