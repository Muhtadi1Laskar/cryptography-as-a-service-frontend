import Sidebar from "./Sidebar";
import Header from "./Header";

export default function PageContainer({ currentPath, title, children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentPath={currentPath} />

      <div className="flex-1 flex flex-col">
        <Header title={title} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
