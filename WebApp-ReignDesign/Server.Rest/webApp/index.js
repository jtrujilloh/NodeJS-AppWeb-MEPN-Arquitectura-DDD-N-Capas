function deletePost(storyId) {

  swal({
    title: 'Atención!',
    text: '¿Está seguro que desea eliminar el registro seleccionado?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!',
    cancelButtonText: 'Cancelar'
  }).then(function (state) {
    if(state.value){
      axios.post('/eliminarPost', {
        story_id: storyId
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          swal({
            title: 'Listo!',
            text: 'El registro se ha eliminado correctamente.',
            type: 'success',
            onClose: () => {
              window.location.reload(true);
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, function (dismiss) {
    // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
  });

};

const hourInSeconds = 3600; //1 Hour
setTimeout(function(){ window.location.reload(true); }, (hourInSeconds * 1000));
