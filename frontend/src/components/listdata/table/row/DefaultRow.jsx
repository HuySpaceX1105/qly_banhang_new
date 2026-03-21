export default function DefaultRow({children}) {
    return (
        <tr>

            {children}
            
            <td>
                <div className="d-flex align-items-center list-action">
                    <a className="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"
                        href="#"><i className="ri-pencil-line mr-0"></i></a>
                    <a className="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                        href="#"><i className="ri-delete-bin-line mr-0"></i></a>
                </div>
            </td>
        </tr>
    );
}