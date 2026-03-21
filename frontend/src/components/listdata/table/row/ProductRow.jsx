import DefaultRow from "./DefaultRow";

export default function ProductRow({product}) {
    const activeText = product.active ? "Hoạt động" : "Ngừng";
    const activeClass = product.active ? "badge bg-success" : "badge bg-danger";
    const sellingPrice = product.selling_price.toLocaleString("vi-VN");
    const createdAt = new Date(product.created_at).toLocaleDateString("vi-VN");
    return (
        <DefaultRow>
            <td>
                <div className="d-flex align-items-center">
                    <img src={product.image} className="img-fluid rounded avatar-50 mr-3" alt="image"/>
                    <div>
                        {product.name}
                        <p className="mb-0">
                            <small>{product.description}</small>
                        </p>
                    </div>
                </div>
            </td>

            <td>{product.sku}</td>
            <td>{product.category}</td>
            <td>{product.unit}</td>
            <td>{sellingPrice} đ</td>
            <td> <span className={activeClass}>{activeText}</span> </td>
            <td> {createdAt} </td>
        </DefaultRow>
    );
}