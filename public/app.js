document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.delete-project').forEach(btn => {
        btn.addEventListener('click', async() => {
            const id = btn.dataset.id;
            const confirmed = confirm('Are you sure you want to delete this project?');
            if(!confirmed) {
                return;
            }
            try {
                const res = await fetch(`/api/projects/${id}`, {
                    method: 'DELETE'
                });
                
                if(!res.ok) {
                    alert('Error deleting the project');
                    return;
                }
                btn.closest('tr').remove();
            } catch (err) {
                console.error(err);
                alert('Server error');
            }
        });
    });

    document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', async() => {
            const id = btn.dataset.id;
            const confirmed = confirm('Are you sure you want to delete this task?');
            if(!confirmed) {
                return;
            }
            try {
                const res = await fetch(`/api/tasks/${id}`, {
                   method: 'DELETE' 
                });
                if(!res.ok) {
                    alert('Error deleting task');
                    return;
                }
                btn.closest('tr').remove();
            } catch(err) {
                console.error(err);
                alert('Server error');
            }
        });
    });
});