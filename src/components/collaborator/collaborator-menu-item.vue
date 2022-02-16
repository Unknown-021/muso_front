<script>
import { createMenuItem } from 'components/ui/base-menu/create-menu-item';
import EditRole from './menu-items/edit-role.vue';
import RemoveCollaborator from './menu-items/remove-collaborator.vue';

export default createMenuItem('album-menu-item', [EditRole, RemoveCollaborator]);
</script>