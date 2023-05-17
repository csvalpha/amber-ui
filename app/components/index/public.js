import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default Component.extend({
    store: service(),
    session: service(),
    doubleActivityColumns: tracked(),
    activities: tracked(),

    willInsertElement() {
        const params = {
            filter: { upcoming: true },
            sort: 'start_time',
            page: { size: 6 }
        };
    
        this.store.query('activity', params).then(retrievedActivities => { 
            this.activities = retrievedActivities; 
            this.doubleActivityColumns = retrievedActivities.length > 3
        });
    }
    
  });
