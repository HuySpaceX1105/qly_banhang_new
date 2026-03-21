export default function EditableRow({ row, onRemove, onChange }) {
  return (
    <tr>

        <td>
            <input
            value={row.sku}
            onChange={(e) => onChange("sku", e.target.value)}
            />
        </td>

        <td>
            <input
            value={row.product}
            onChange={(e) => onChange("product", e.target.value)}
            />
        </td>

      <td>
        <input
          type="number"
          min="1"
          value={row.import_price}
          onChange={(e) => onChange("import_price", e.target.value)}
        />
      </td>

      <td>
        <input
          type="number"
          min="1"
          value={row.quantity}
          onChange={(e) => onChange("quantity", e.target.value)}
        />
      </td>

      <td>
        <input
          type="date"
          value={row.manufacture_date}
          onChange={(e) => onChange("manufacture_date", e.target.value)}
        />
      </td>

      <td>
        <input
          type="date"
          value={row.expiry_date}
          onChange={(e) => onChange("expiry_date", e.target.value)}
        />
      </td>

      <td>
        <button
          className="btn bg-danger-light btn-rounded btn-sm"
          onClick={onRemove}
        >
          Remove
        </button>
      </td>

    </tr>
  );
}   