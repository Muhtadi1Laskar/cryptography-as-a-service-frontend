import { Outlet } from "react-router-dom";
import PageContainer from "../components/layouts/PageContainer";

export default function HmacPage() {
    return (
        <PageContainer currentPath="/hmac" title="HMAC">
            <div className="p-6">
                <Outlet />
            </div>
        </PageContainer>
    )
}