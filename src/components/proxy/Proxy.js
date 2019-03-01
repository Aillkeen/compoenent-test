import Access from './_Access';
import Auth from './_Auth';
import Create from './_Create';
import Delete from './_Delete';
import DeleteGravados from './_DeleteGravados';
import Execute from './_Execute';
import Save from './_Save';

const Proxy = {
  Access: Access,
  Auth: Auth,
  Create: Create,
  Delete: Delete,
  DeleteGravados: DeleteGravados,
  Execute: Execute,
  Save: Save,
};

export default Proxy;
