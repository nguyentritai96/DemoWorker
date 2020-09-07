self.addEventListener('sync', event => {
    if (event.tag === 'addSyncButton') {
        console.log('Finish Sync Action')
    }
})