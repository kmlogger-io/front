import { apiClient } from "../../../../../shared/services/apiService";

export function Dashboard() {
    const currentUser = apiClient.getCurrentUser();

    return (
        <div>
        </div>
    );
}
