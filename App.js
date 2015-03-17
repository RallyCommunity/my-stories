Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        this.add({
            xtype: 'rallyiterationcombobox',
            listeners: {
                select: this._onIterationChanged,
                ready: this._onIterationsLoaded,
                scope: this
            }
        });
    },

    _onIterationsLoaded: function() {
        this.add({
            xtype: 'rallygrid',
            width: 500,
            columnCfgs: [
                'FormattedID',
                'Name',
                'ScheduleState'
            ],
            context: this.getContext(),
            storeConfig: {
                model: 'userstory',
                filters: [this._getIterationFilter()]
            }
        });
    },

    _getIterationFilter: function() {
        return  this.down('rallyiterationcombobox').getQueryFromSelected().and({property: 'Owner',operator: '=',value: this.getContext().getUser()._ref});
    },

    _onIterationChanged: function() {
        var grid = this.down('rallygrid');
        var store = grid.getStore();
        store.clearFilter(true);
        store.filter(this._getIterationFilter());
    }
});