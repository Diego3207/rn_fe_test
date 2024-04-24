module.exports = {

    tableName: 'purchase_order_evidences',
    attributes: 
    { 
      
      id: { // purchase_order_evidence_id int NOT NULL
        type: 'string', 
        columnName: 'purchase_order_evidence_id',
        columnType: 'integer',
        autoIncrement: true,
      },
      purchaseOrderEvidencePurchaseOrderId: {  // purchase_order_evidence_purchase_order_id  INT  NULL
        columnName: 'purchase_order_evidence_purchase_order_id',
        model:'purchaseOrder',
      },
      purchaseOrderEvidencePath: {  // purchase_order_evidence_path varchar NOT NULLL
        columnName: 'purchase_order_evidence_path',
        columnType: 'varchar(255)',
        type:'string'
      },
      purchaseOrderEvidenceSize: {  // purchase_order_evidence_size INT NOT NULLL
        columnName: 'purchase_order_evidence_size',
        columnType: 'integer',
        type:'ref'
      },
      purchaseOrderEvidenceName: {  // purchase_order_evidence_name varchar NOT NULLL
        columnName: 'purchase_order_evidence_name',
        columnType: 'varchar(255)',
        type:'string'
      },
      purchaseOrderEvidenceActive : { // purchase_order_evidence_active  inyint(1)   NOT NULL
        type: 'boolean',
        defaultsTo : true, // poner valor true (1) por default
        columnType: 'boolean',      
        columnName: 'purchase_order_evidence_active', 
      },
    },
  }; 


  