export const toast = {
    action: 'Fechar',

    welcome: 'Bem-vindo ao sistema!',

    // success messages
    success_delete_list: 'Os registros selecionados foram excluídos com sucesso!',
    success_delete: 'O registro foi excluído com sucesso!',
    success_erase: 'O registro foi desativado!',
    success_erase_list: 'Os registros selecionados foram desativados!',
    success_save: 'Este registro foi salvo com sucesso!',
    success_update: 'Este registro foi atualizado com sucesso!',

    // error messages
    error_router: 'Seu perfil de acesso não tem autorização',
    error_login: 'Ops! Algo deu errado...',
    error_getall: 'Ops! O servidor pode estar Offline. Verifique a sua conexão!',
    error_delete_list: 'Houve um problema ao exluir os registros selecionados!',
    error_delete: 'Houve um problema ao excluir este registro!',
    error_erase_list: 'Ops! Não foi possível desativar os registros selecionados!',
    error_erase: 'Ops! Este registro não pôde ser desativado!',
    error_getone: 'Ops! Verifique a autenticidade deste registro. Ou carregue novamente!',
    error_copy: 'Este registro não pôde ser copiado!',
    error_save: 'Ops! Houve um problema ao salvar este registro.',
    error_update: 'Ops! Houve um problema ao atualizar este registro.'

};

export const alertDialog = {
    confirm_erase: {
        title: 'Tem certeza de que deseja desativar o(s) registro(s)?',
        content: 'Ao confirmar, o(s) registro(s) será/serão desativados, porém ainda haverá a possibilidade de reativá-los.',
        actionConfirm: 'Sim, Desativar',
        actionCancel: 'Cancelar'
    },

    confirm_delete: {
        title: 'Tem certeza de que deseja excluir o(s) registro(s)?',
        content: 'Ao confirmar, será excluído permanentemente!',
        actionConfirm: 'Excluir',
        actionCancel: 'Cancelar'
    },

    confirm_cancel: {
        title: 'Tem certeza de que deseja cancelar?',
        content: 'As informações serão perdidados caso cancele!',
        actionConfirm: 'Sim, Cancelar',
        actionCancel: 'Continuar Editando'
    },

    confirm_update: {
        title: 'Tem certeza que deseja atualizar?',
        content: 'As informações atuais serão substiuídas, caso prossiga.',
        actionConfirm: 'Sim, Atualizar',
        actionCancel: 'Cancelar'
    }
};
