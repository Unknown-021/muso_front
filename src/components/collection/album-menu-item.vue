<script>
import { createMenuItem } from 'components/ui/base-menu/create-menu-item';
import ShareLabelCopy from './album-menu-items/share-label-copy.vue';
import RemoveCredits from './album-menu-items/remove-credits.vue';
import RemoveAlbum from './album-menu-items/remove-album.vue';
import FinalizeAlbum from './album-menu-items/finalize-album.vue';
import ExportCredits from './album-menu-items/export-credits.vue';

export default createMenuItem('album-menu-item', [ShareLabelCopy, RemoveCredits, RemoveAlbum, FinalizeAlbum, ExportCredits]);
</script>