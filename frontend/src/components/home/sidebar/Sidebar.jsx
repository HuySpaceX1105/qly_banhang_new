import SidebarCollapseItem from "./SidebarCollapseItem";
import SidebarSubItem from "./SidebarSubItem";
import SvgIcon from "./SvgIcon";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
           
    <div className="data-scrollbar" data-scroll="1">
        <nav className="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" className="iq-menu">
    
                {/* Dashboard */}
                <SidebarItem href="/" title="Trang chủ" active={true} icon={
                                                                            <SvgIcon id="p-dash1">
                                                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                                                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                                                            </SvgIcon>
                                                                        }/>

                {/* Products */}
                <SidebarCollapseItem id="product" title="Sản phẩm" icon={
                                                                        <SvgIcon id="p-dash2">
                                                                            <circle cx="9" cy="21" r="1" />
                                                                            <circle cx="20" cy="21" r="1" />
                                                                            <path d="M1 1h4l2.68 13.39" />
                                                                        </SvgIcon>
                                                                    }>

                <SidebarSubItem href="../backend/page-list-product.html" title="Danh sách sản phẩm"/>
                <SidebarSubItem href="/add/product" title="Thêm sản phẩm" />
                </SidebarCollapseItem>

                {/* Categories */}
                <SidebarCollapseItem id="category" title="Loại vật liệu" icon={
                                                                        <SvgIcon id="p-dash3">
                                                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                                        </SvgIcon>
                                                                    }>
                <SidebarSubItem href="../backend/page-list-category.html" title="Danh sách loại vật liệu"/>
                <SidebarSubItem href="/add/category" title="Thêm loại vật liệu"/>
                </SidebarCollapseItem>

                {/* Export */}
                <SidebarCollapseItem id="sale" title="Xuất kho" icon={
                                                                <SvgIcon id="p-dash4">
                                                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                                                </SvgIcon>
                                                            }>
                <SidebarSubItem href="../backend/page-list-sale.html" title="Danh sách xuất kho"/>
                <SidebarSubItem href="../backend/page-add-sale.html" title="Thêm phiếu xuất kho"/>
                </SidebarCollapseItem>

                {/* Import */}
                <SidebarCollapseItem id="purchase" title="Nhập kho" icon={
                                                                        <SvgIcon id="p-dash5">
                                                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                                            <line x1="1" y1="10" x2="23" y2="10"></line>
                                                                        </SvgIcon>
                                                                    }>
                <SidebarSubItem href="../backend/page-list-purchase.html" title="Danh sách nhập kho" />
                <SidebarSubItem href="../backend/page-add-purchase.html" title="Thêm phiếu nhập kho" />
                </SidebarCollapseItem>    

                {/* Returns */}
                <SidebarCollapseItem id="return" title="Trả hàng" icon={
                                                                    <SvgIcon id="p-dash6">
                                                                        <polyline points="4 14 10 14 10 20"></polyline>
                                                                        <polyline points="20 10 14 10 14 4"></polyline>
                                                                        <line x1="14" y1="10" x2="21" y2="3"></line>
                                                                        <line x1="3" y1="21" x2="10" y2="14"></line>
                                                                    </SvgIcon>
                                                                }>
                <SidebarSubItem href="../backend/page-list-returns.html" title="Danh sách trả hàng"/>
                <SidebarSubItem href="../backend/page-add-return.html" title="Thêm phiếu trả hàng"/>
                </SidebarCollapseItem>   

                {/* People */}                                                    
                <SidebarCollapseItem id="partner" title="Đối tác" icon={
                                                                    <SvgIcon id="p-dash8">
                                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                    <circle cx="9" cy="7" r="4"></circle>
                                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                                    </SvgIcon>
                                                                }>
                <SidebarSubItem href="../backend/page-list-customers.html" title="Danh sách khách hàng"/>
                <SidebarSubItem href="../backend/page-add-customers.html" title="Thêm khách hàng"/>
                <SidebarSubItem href="../backend/page-list-suppliers.html" title="Danh sách nhà cung cấp"/>
                <SidebarSubItem href="../backend/page-add-supplier.html" title="Thêm nhà cung cấp"/>
                </SidebarCollapseItem>
                                                                

                <SidebarCollapseItem id="user" title="Nhân sự" icon={
                                                                        <SvgIcon id="p-dash10">
                                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                            <circle cx="8.5" cy="7" r="4"></circle>
                                                                            <polyline points="17 11 19 13 23 9"></polyline>
                                                                        </SvgIcon>
                                                                    }>
                <SidebarSubItem href="../backend/page-list-users.html" title="Danh sách người dùng"/>
                <SidebarSubItem href="../backend/page-add-users.html" title="Thêm người dùng"/>
                </SidebarCollapseItem>

                <SidebarItem href="../backend/page-report.html" title="Reports" icon={
                                                                                    <SvgIcon id="p-dash7">
                                                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                                                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                                                                    <polyline points="10 9 9 9 8 9"></polyline>
                                                                                    </SvgIcon>
                                                                                }/>

            </ul>
        </nav>
        
        <div className="p-3"></div>
    </div> 
  );
}