import { Outlet } from "react-router-dom";
import PageContainer from "../components/layouts/PageContainer";

export default function AesPage() {
  return (
    <PageContainer currentPath="/aes" title="AES">
      <div className="p-6">
        <Outlet />
      </div>
    </PageContainer>
  );
}