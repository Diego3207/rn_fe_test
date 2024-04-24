module.exports = {

    tableName: 'deleted_supplies',
    attributes:
    {

        id: { 
            type: 'string',
            columnName: 'deleted_supply_id',
            columnType: 'integer',
            autoIncrement: true,
        },

        deletedSupplyDate: {
            type: 'ref',
            required: false,
            columnType: 'DATETIME', 
            defaultsTo:null,
            columnName: 'deleted_supply_date',
        },

        deletedSupplyUserId: {  
            columnName: 'deleted_supply_user_id',
            model:'user',
        },

        deletedSupplyPurchaseOrderId: {  
            type: 'string',  
            columnName : 'deleted_supply_purchase_order_id',
            columnType : 'integer',
        },

        deletedSupplySupplyKey: {  
            columnName: 'deleted_supply_supply_key',
            type:'string',
            required: false,
            columnType:'varchar(255)',
            unique: true,
            minLength: 1,
            maxLength: 255,
        },  
        
        deletedSupplyActive: { 
            type: 'boolean',
            defaultsTo: true,
            columnType: 'boolean',
            columnName: 'deleted_supply_active',
        },
    }
};