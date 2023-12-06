import { Information } from "iconsax-react";

export default function NeedAccess() {
  return (
    <div className="error-page-container">
      <div className="bg">
        <Information variant="Bulk" size={200} />
        <h5>You have no access to this page</h5>
      </div>
    </div>
  );
}
