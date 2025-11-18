import { Outlet } from "react-router-dom";
import PageContainer from "../components/layouts/PageContainer";

export default function HashPage() {
  return (
    <PageContainer currentPath="/hash" title="Hashing">
      <div className="p-6">
        <Outlet />   {/* renders text/file/verify */}
      </div>
    </PageContainer>
  );
}
