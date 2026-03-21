export default function Pagination({}) {
    
    return (
        <div className="row justify-content-between mt-3">
            <div id="user-list-page-info" className="col-md-6">
                <span>Showing 1 to 5 of 5 entries</span>
            </div>
            <div className="col-md-6">
                <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    );
}   