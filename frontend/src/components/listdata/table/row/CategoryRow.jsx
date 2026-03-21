import DefaultRow from "./DefaultRow";

export default function CategoryRow({category}) {
    return (
        <DefaultRow>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>{category.created_at}</td>
            <td>{category.updated_at}</td>
        </DefaultRow>
    );
}