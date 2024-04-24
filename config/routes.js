
module.exports.routes = 
{

	'/view' : {view:'vw'},
	
	//manejo de usuarios
	'POST /user/register': 'user/register-action',  
	'GET /user/confirm': 'user/confirm-action',  
	'POST /user/login': 'user/login-action',
	'POST /user/forgot-password': 'user/forgot-password-action',
	'POST /user/reset-password': 'user/reset-password-action',	
	'GET /user/list' : 'user/list-action',
	'PUT /user/disable': 'user/disable-action',
	'DELETE /user/delete': 'user/delete-action',
	'POST /user/add': 'user/add-action',	
	'GET /user/find': 'user/find-action',
	'PUT /user/update': 'user/update-action',
	'POST /user/validator' : 'user/validator-action',
	
	//acciones user-banrch
	'POST /userBranch/add' : 'userBranch/add-action',
	'PUT /userBranch/update' : 'userBranch/update-action',
	'PUT /userBranch/disable': 'userBranch/disable-action',
	
	//acciones de rol
	'GET /role/list' : 'role/list-action',
	'PUT /role/update' : 'role/update-action',
	'PUT /role/disable': 'role/disable-action',
	'POST /role/add' : 'role/add-action',
	'GET /role/find': 'role/find-action',
	
	//acciones de role-rights
	'POST /roleRight/add' : 'roleRight/add-action',
	'PUT /roleRight/update' : 'roleRight/update-action',
	'PUT /roleRight/disable': 'roleRight/disable-action',
	'GET /roleRight/find': 'roleRight/find-action',
	
	//acciones de sucursal
	'GET /branch/list' : 'branch/list-action',
	'PUT /branch/disable': 'branch/disable-action',
	'POST /branch/add': 'branch/add-action',
	'GET /branch/find': 'branch/find-action',
	'PUT /branch/update': 'branch/update-action',
	
	//modulos
	'GET /module/list' : 'module/list-action',
	'PUT /module/disable': 'module/disable-action',
	'POST /module/add': 'module/add-action',
	'GET /module/find': 'module/find-action',
	'PUT /module/update': 'module/update-action',
	
	//acciones de archivos
	'POST /file/upload' : 'file/upload-action',
	'GET /file/download' : 'file/download-action',
	'DELETE /file/delete' : 'file/delete-action',

	//Manejo del model Product
	'POST /product/add': 'product/add-action',
	'GET /product/find': 'product/find-action',
	'PUT /product/update': 'product/update-action',
	'PUT /product/delete': 'product/delete-action',
	'GET /product/list': 'product/list-action',
	'PUT /product/disable': 'product/disable-action',

	//Manejo del model Costumer
	'POST /costumer/add': 'costumer/add-action',
	'GET /costumer/find': 'costumer/find-action',
	'PUT /costumer/update': 'costumer/update-action',
	'PUT /costumer/delete': 'costumer/delete-action',
	'GET /costumer/list': 'costumer/list-action',
	'PUT /costumer/disable': 'costumer/disable-action',
  

	//Manejo del model costumerContact
	'POST /costumerContact/add': 'costumerContact/add-action',
	'GET /costumerContact/find': 'costumerContact/find-action',
	'PUT /costumerContact/update': 'costumerContact/update-action',
	'PUT /costumerContact/delete': 'costumerContact/delete-action',
	'GET /costumerContact/list': 'costumerContact/list-action',
	'PUT /costumerContact/disable': 'costumerContact/disable-action',

	//Manejo del model costumerDataBank
	'POST /costumerDataBank/add': 'costumerDataBank/add-action',
	'GET /costumerDataBank/find': 'costumerDataBank/find-action',
	'PUT /costumerDataBank/update': 'costumerDataBank/update-action',
	'PUT /costumerDataBank/delete': 'costumerDataBank/delete-action',
	'GET /costumerDataBank/list': 'costumerDataBank/list-action',
	'PUT /costumerDataBank/disable': 'costumerDataBank/disable-action',

	//Manejo del model cfdi
	'POST /cfdi/add': 'cfdi/add-action',
	'GET /cfdi/find': 'cfdi/find-action',
	'PUT /cfdi/update': 'cfdi/update-action',
	'PUT /cfdi/delete': 'cfdi/delete-action',
	'GET /cfdi/list': 'cfdi/list-action',
	'PUT /cfdi/disable': 'cfdi/disable-action',

	//Manejo del model cfdi
	'POST /payWay/add': 'payWay/add-action',
	'GET /payWay/find': 'payWay/find-action',
	'PUT /payWay/update': 'payWay/update-action',
	'PUT /payWay/delete': 'payWay/delete-action',
	'GET /payWay/list': 'payWay/list-action',
	'PUT /payWay/disable': 'payWay/disable-action',

	//Manejo del model cfdi
	'POST /payMethod/add': 'payMethod/add-action',
	'GET /payMethod/find': 'payMethod/find-action',
	'PUT /payMethod/update': 'payMethod/update-action',
	'PUT /payMethod/delete': 'payMethod/delete-action',
	'GET /payMethod/list': 'payMethod/list-action',
	'PUT /payMethod/disable': 'payMethod/disable-action',

	//Manejo del model dataBank
	'POST /dataBank/add': 'dataBank/add-action',
	'GET /dataBank/find': 'dataBank/find-action',
	'PUT /dataBank/update': 'dataBank/update-action',
	'PUT /dataBank/delete': 'dataBank/delete-action',
	'GET /dataBank/list': 'dataBank/list-action',
	'PUT /dataBank/disable': 'dataBank/disable-action',

	//Manejo del model de la documentacion de los productos
	'POST /productFile/add': 'productFile/add-action',
	'GET /productFile/find': 'productFile/find-action',
	'PUT /productFile/update': 'productFile/update-action',
	'PUT /productFile/delete': 'productFile/delete-action',
	'GET /productFile/list': 'productFile/list-action',
	'PUT /productFile/disable': 'productFile/disable-action',

	//Manejo del model de los archivos de las cotizaciones
	'POST /quotationSaleTemplate/add': 'quotationSaleTemplate/add-action',
	'GET /quotationSaleTemplate/find': 'quotationSaleTemplate/find-action',
	'PUT /quotationSaleTemplate/update': 'quotationSaleTemplate/update-action',
	'PUT /quotationSaleTemplate/delete': 'quotationSaleTemplate/delete-action',
	'GET /quotationSaleTemplate/list': 'quotationSaleTemplate/list-action',
	'PUT /quotationSaleTemplate/disable': 'quotationSaleTemplate/disable-action',

	// Manejo del model de rastreador
	'POST /tracker/add': 'tracker/add-action',
	'GET /tracker/find': 'tracker/find-action',
	'PUT /tracker/update': 'tracker/update-action',
	'PUT /tracker/delete': 'tracker/delete-action',
	'GET /tracker/list': 'tracker/list-action',
	'GET /tracker/native': 'tracker/native-action',
	'PUT /tracker/disable': 'tracker/disable-action',

	//Manejo del model de categorias de los productos

	'GET /productCategory/list': 'productCategory/list-action',

	//Manejo del model Stocktaking
	'POST /stocktaking/add': 'stocktaking/add-action',
	//'GET /product/find': 'product/find-action',
	'PUT /stocktaking/update': 'stocktaking/update-action',
	//'PUT /product/delete': 'product/delete-action',
	'GET /stocktaking/list': 'stocktaking/list-action',
	//'PUT /product/disable': 'product/disable-action',

	//Manejo del model supply
	'POST /supply/add': 'supply/add-action',
	'GET /supply/find': 'supply/find-action',
	'PUT /supply/update': 'supply/update-action',
	'PUT /supply/delete': 'supply/delete-action',
	'GET /supply/native': 'supply/native-action',
	'GET /supply/list': 'supply/list-action',
	'PUT /supply/disable': 'supply/disable-action',

	//Manejo del model simCard
	'POST /simCard/add': 'simCard/add-action',
	'GET /simCard/find': 'simCard/find-action',
	'PUT /simCard/update': 'simCard/update-action',
	'PUT /simCard/delete': 'simCard/delete-action',
	'GET /simCard/list': 'simCard/list-action',
	'GET /simCard/native': 'simCard/native-action',
	'PUT /simCard/disable': 'simCard/disable-action',

	//Acciones de location
	'POST /location/add': 'location/add-action',
	'GET /location/find': 'location/find-action',
	'PUT /location/update': 'location/update-action',
	'PUT /location/delete': 'location/delete-action',
	'GET /location/list': 'location/list-action',
	'GET /location/filter': 'location/filter-action',
	'PUT /location/disable': 'location/disable-action',

	//Acciones de proveedor
	'POST /provider/add': 'provider/add-action',
	'GET /provider/find': 'provider/find-action',
	'PUT /provider/update': 'provider/update-action',
	'DELETE /provider/delete': 'provider/delete-action',
	'PUT /provider/disable': 'provider/disable-action',
	'GET /provider/list': 'provider/list-action',

	//Acciones en producto de un proveedor
	'POST /providerProduct/add': 'providerProduct/add-action',
	'GET /providerProduct/find': 'providerProduct/find-action',
	'PUT /providerProduct/update': 'providerProduct/update-action',
	'DELETE /providerProduct/delete': 'providerProduct/delete-action',
	'PUT /providerProduct/disable': 'providerProduct/disable-action',
	'GET /providerProduct/list': 'providerProduct/list-action',

	//Acciones en servicio de un proveedor
	'POST /providerService/add': 'providerService/add-action',
	'GET /providerService/find': 'providerService/find-action',
	'PUT /providerService/update': 'providerService/update-action',
	'DELETE /providerService/delete': 'providerService/delete-action',
	'PUT /providerService/disable': 'providerService/disable-action',
	'GET /providerService/list': 'providerService/list-action',

	//Acciones de proveedor contacto
	'POST /providerContact/add': 'providerContact/add-action',
	'GET /providerContact/find': 'providerContact/find-action',
	'PUT /providerContact/update': 'providerContact/update-action',
	'DELETE /providerContact/delete': 'providerContact/delete-action',
	'PUT /providerContact/disable': 'providerContact/disable-action',
	'GET /providerContact/list': 'providerContact/list-action',

	//Acciones de proveedor location
	'POST /providerLocation/add': 'providerLocation/add-action',
	'GET /providerLocation/find': 'providerLocation/find-action',
	'PUT /providerLocation/update': 'providerLocation/update-action',
	'DELETE /providerLocation/delete': 'providerLocation/delete-action',
	'PUT /providerLocation/disable': 'providerLocation/disable-action',
	'GET /providerLocation/list': 'providerLocation/list-action',

	//Acciones de servicio
	'POST /service/add': 'service/add-action',
	'GET /service/find': 'service/find-action',
	'DELETE /service/delete': 'service/delete-action',
	'PUT /service/disable': 'service/disable-action',
	'PUT /service/update': 'service/update-action',
	'GET /service/list': 'service/list-action',

	//Acciones de cotizacion para compra
	'POST /quotationPurchase/add': 'quotationPurchase/add-action',
	'GET /quotationPurchase/find': 'quotationPurchase/find-action',
	'PUT /quotationPurchase/update': 'quotationPurchase/update-action',
	'DELETE /quotationPurchase/delete': 'quotationPurchase/delete-action',
	'PUT /quotationPurchase/disable': 'quotationPurchase/disable-action',
	'GET /quotationPurchase/list': 'quotationPurchase/list-action',
	'GET /quotationPurchase/native': 'quotationPurchase/native-action',	

	//Acciones de detalle de cotizacion para compra de productos
	'POST /quotationPurchaseProduct/add': 'quotationPurchaseProduct/add-action',
	'GET /quotationPurchaseProduct/find': 'quotationPurchaseProduct/find-action',
	'PUT /quotationPurchaseProduct/update': 'quotationPurchaseProduct/update-action',
	'PUT /quotationPurchaseProduct/disable': 'quotationPurchaseProduct/disable-action',
	'DELETE /quotationPurchaseProduct/delete': 'quotationPurchaseProduct/delete-action',
	'GET /quotationPurchaseProduct/list': 'quotationPurchaseProduct/list-action',

	//Acciones de detalle de cotizacion para compra de servicios
	'POST /quotationPurchaseService/add': 'quotationPurchaseService/add-action',
	'GET /quotationPurchaseService/find': 'quotationPurchaseService/find-action',
	'PUT /quotationPurchaseService/update': 'quotationPurchaseService/update-action',
	'PUT /quotationPurchaseService/disable': 'quotationPurchaseService/disable-action',
	'DELETE /quotationPurchaseService/delete': 'quotationPurchaseService/delete-action',
	'GET /quotationPurchaseService/list': 'quotationPurchaseService/list-action',
	
	


	//Acciones de cotizacion para venta
	'POST /quotationSale/add': 'quotationSale/add-action',
	'GET /quotationSale/find': 'quotationSale/find-action',
	'PUT /quotationSale/update': 'quotationSale/update-action',
	'DELETE /quotationSale/delete': 'quotationSale/delete-action',
	'PUT /quotationSale/disable': 'quotationSale/disable-action',
	'GET /quotationSale/list': 'quotationSale/list-action',
	'GET /quotationSale/native': 'quotationSale/native-action',	

	//Acciones terminos comerciales de cotizacion de venta
	'GET /quotationSaleCommercialTerm/list': 'quotationSaleCommercialTerm/list-action',


	//Acciones de detalle de cotizacion para venta de productos
	'POST /quotationSaleProduct/add': 'quotationSaleProduct/add-action',
	'GET /quotationSaleProduct/find': 'quotationSaleProduct/find-action',
	'PUT /quotationSaleProduct/update': 'quotationSaleProduct/update-action',
	'PUT /quotationSaleProduct/disable': 'quotationSaleProduct/disable-action',
	'DELETE /quotationSaleProduct/delete': 'quotationSaleProduct/delete-action',
	'GET /quotationSaleProduct/list': 'quotationSaleProduct/list-action',

	//Acciones de detalle de cotizacion para venta de servicios
	'POST /quotationSaleService/add': 'quotationSaleService/add-action',
	'GET /quotatioSaleService/find': 'quotationSaleService/find-action',
	'PUT /quotationSaleService/update': 'quotationSaleService/update-action',
	'PUT /quotationSaleService/disable': 'quotationSaleService/disable-action',
	'DELETE /quotationSaleService/delete': 'quotationSaleService/delete-action',
	'GET /quotationSaleService/list': 'quotationSaleService/list-action',

	//Acciones de detalle de cotizacion para venta de paquetes
	'POST /quotationSalePackage/add': 'quotationSalePackage/add-action',
	'GET /quotatioSalePackage/find': 'quotationSalePackage/find-action',
	'PUT /quotationSalePackage/update': 'quotationSalePackage/update-action',
	'PUT /quotationSalePackage/disable': 'quotationSalePackage/disable-action',
	'DELETE /quotationSalePackage/delete': 'quotationSalePackage/delete-action',
	'GET /quotationSalePackage/list': 'quotationSalePackage/list-action',	

	//Acciones de orden de compra
	'POST /purchaseOrder/add': 'purchaseOrder/add-action',
	'GET /purchaseOrder/find': 'purchaseOrder/find-action',
	'PUT /purchaseOrder/update': 'purchaseOrder/update-action',
	'DELETE /purchaseOrder/delete': 'purchaseOrder/delete-action',
	'PUT /purchaseOrder/disable': 'purchaseOrder/disable-action',
	'GET /purchaseOrder/list': 'purchaseOrder/list-action',

	

	//Acciones de productos de una orden de compra 
	'POST /purchaseOrderProduct/add': 'purchaseOrderProduct/add-action',
	'GET /purchaseOrderProduct/find': 'purchaseOrderProduct/find-action',
	'PUT /purchaseOrderProduct/update': 'purchaseOrderProduct/update-action',
	'DELETE /purchaseOrderProduct/delete': 'purchaseOrderProduct/delete-action',
	'PUT /purchaseOrderProduct/disable': 'purchaseOrderProduct/disable-action',
	'GET /purchaseOrderProduct/list': 'purchaseOrderProduct/list-action',

	//Acciones de servicios de una orden de compra
	'POST /purchaseOrderService/add': 'purchaseOrderService/add-action',
	'GET /purchaseOrderService/find': 'purchaseOrderService/find-action',
	'PUT /purchaseOrderService/update': 'purchaseOrderService/update-action',
	'DELETE /purchaseOrderService/delete': 'purchaseOrderService/delete-action',
	'PUT /purchaseOrderService/disable': 'purchaseOrderService/disable-action',
	'GET /purchaseOrderService/list': 'purchaseOrderService/list-action',

	//Acciones de detalle de orden de compra para facturas
	'POST /purchaseOrderEvidence/add': 'purchaseOrderEvidence/add-action',
	'GET /purchaseOrderEvidence/find': 'purchaseOrderEvidence/find-action',
	'PUT /purchaseOrderEvidence/update': 'purchaseOrderEvidence/update-action',
	'PUT /purchaseOrderEvidence/disable': 'purchaseOrderEvidence/disable-action',
	'PUT /purchaseOrderEvidence/delete': 'purchaseOrderEvidence/delete-action',
	'GET /purchaseOrderEvidence/list': 'purchaseOrderEvidence/list-action',

	//Acciones de paquetes
	'POST /package/add': 'package/add-action',
	'GET /package/find': 'package/find-action',
	'PUT /package/update': 'package/update-action',
	'DELETE /package/delete': 'package/delete-action',
	'PUT /package/disable': 'package/disable-action',
	'GET /package/list': 'package/list-action',

	//Acciones de detalle de  paquetes con productos
	'POST /packageProduct/add': 'packageProduct/add-action',
	'GET /packageProduct/find': 'packageProduct/find-action',
	'PUT /packageProduct/update': 'packageProduct/update-action',
	'PUT /packageProduct/disable': 'packageProduct/disable-action',
	'DELETE /packageProduct/delete': 'packageProduct/delete-action',
	'GET /packageProduct/list': 'packageProduct/list-action',

	//Acciones de detalle de paquetes con servicios
	'POST /packageService/add': 'packageService/add-action',
	'GET /packageService/find': 'packageService/find-action',
	'PUT /packageService/update': 'packageService/update-action',
	'PUT /packageService/disable': 'packageService/disable-action',
	'DELETE /packageService/delete': 'packageService/delete-action',
	'GET /packageService/list': 'packageService/list-action',

	//Acciones de orden de vemta
	'POST /saleOrder/add': 'saleOrder/add-action',
	'GET /saleOrder/find': 'saleOrder/find-action',
	'PUT /saleOrder/update': 'saleOrder/update-action',
	'DELETE /saleOrder/delete': 'saleOrder/delete-action',
	'PUT /saleOrder/disable': 'saleOrder/disable-action',
	'GET /saleOrder/list': 'saleOrder/list-action',


	//Generador de reportes, fuera del paquete por que puede hacer uso de uno o mas paquetes
	'GET /report/quotationSale': 'report/quotation-sale-pdf-action',
	'GET /report/saleOrder': 'report/sale-order-pdf-action',

	//Acciones de vehicle
	'POST /vehicle/add': 'vehicle/add-action',
	'GET /vehicle/find': 'vehicle/find-action',
	'DELETE /vehicle/delete': 'vehicle/delete-action',
	'GET /vehicle/list': 'vehicle/list-action',
	'PUT /vehicle/update': 'vehicle/update-action',
	'PUT /vehicle/disable': 'vehicle/disable-action',

	//Acciones de trackerInstallation
	'POST /trackerInstallation/add': 'trackerInstallation/add-action',
	'GET /trackerInstallation/find': 'trackerInstallation/find-action',
	'DELETE /trackerInstallation/delete': 'trackerInstallation/delete-action',
	'GET /trackerInstallation/native': 'trackerInstallation/native-action',
	'GET /trackerInstallation/list': 'trackerInstallation/list-action',
	'PUT /trackerInstallation/update': 'trackerInstallation/update-action',
	'PUT /trackerInstallation/disable': 'trackerInstallation/disable-action',

	//Acciones de installer
	'POST /installer/add': 'installer/add-action',
	'GET /installer/find': 'installer/find-action',
	'DELETE /installer/delete': 'installer/delete-action',
	'GET /installer/list': 'installer/list-action',
	'PUT /installer/update': 'installer/update-action',
	'PUT /installer/disable': 'installer/disable-action',

	//Acciones de trackerInstallationAccessory
	'POST /trackerInstallationAccessory/add': 'trackerInstallationAccessory/add-action',
	'GET /trackerInstallationAccessory/find': 'trackerInstallationAccessory/find-action',
	'DELETE /trackerInstallationAccessory/delete': 'trackerInstallationAccessory/delete-action',
	'GET /trackerInstallationAccessory/list': 'trackerInstallationAccessory/list-action',
	'PUT /trackerInstallationAccessory/update': 'trackerInstallationAccessory/update-action',
	'PUT /trackerInstallationAccessory/disable': 'trackerInstallationAccessory/disable-action',

	//Acciones de detalle de evidnecia de solo instalaciones
	'POST /trackerInstallationEvidence/add': 'trackerInstallationEvidence/add-action',
	'GET /trackerInstallationEvidence/find': 'trackerInstallationEvidence/find-action',
	'PUT /trackerInstallationEvidence/update': 'trackerInstallationEvidence/update-action',
	'PUT /trackerInstallationEvidence/disable': 'trackerInstallationEvidence/disable-action',
	'PUT /trackerInstallationEvidence/delete': 'trackerInstallationEvidence/delete-action',
	'GET /trackerInstallationEvidence/list': 'trackerInstallationEvidence/list-action',

	//Acciones de evidencia relacionada al proceso de instalaciones (tbl general )
	'POST /evidenceInstallation/add': 'evidenceInstallation/add-action',
	'GET /evidenceInstallation/find': 'evidenceInstallation/find-action',
	'PUT /evidenceInstallation/update': 'evidenceInstallation/update-action',
	'PUT /evidenceInstallation/disable': 'evidenceInstallation/disable-action',
	'PUT /evidenceInstallation/delete': 'evidenceInstallation/delete-action',
	'GET /evidenceInstallation/list': 'evidenceInstallation/list-action',

	//Acciones de desinstalacion
	'POST /trackerUninstall/add': 'trackerUninstall/add-action',
	'GET /trackerUninstall/find': 'trackerUninstall/find-action',
	'DELETE /trackerInstallation/delete': 'trackerUninstall/delete-action',
	'GET /trackerUninstall/list': 'trackerUninstall/list-action',
	'PUT /trackerUninstall/update': 'trackerUninstall/update-action',
	'PUT /trackerUninstall/disable': 'trackerUninstall/disable-action',

	//Acciones de evidencia relacionada a solo desintstalaciones
	'POST /trackerUninstallEvidence/add': 'trackerUninstallEvidence/add-action',
	'GET /trackerUninstallEvidence/find': 'trackerUninstallEvidence/find-action',
	'PUT /trackerUninstallEvidence/update': 'trackerUninstallEvidence/update-action',
	'PUT /trackerUninstallEvidence/disable': 'trackerUninstallEvidence/disable-action',
	'PUT /trackerUninstallEvidence/delete': 'trackerUninstallEvidence/delete-action',
	'GET /trackerUninstallEvidence/list': 'trackerUninstallEvidence/list-action',

	//Acciones de revisiones de instalaciones
	'POST /trackerInstallationReview/add': 'trackerInstallationReview/add-action',
	'GET /trackerInstallationReview/find': 'trackerInstallationReview/find-action',
	'DELETE /trackerInstallationReview/delete': 'trackerInstallationReview/delete-action',
	'GET /trackerInstallationReview/list': 'trackerInstallationReview/list-action',
	'PUT /trackerInstallationReview/update': 'trackerInstallationReview/update-action',
	'PUT /trackerInstallationReview/disable': 'trackerInstallationReview/disable-action',

	//Acciones de evidencia de revisiones de instalaciones
	'POST /trackerInstallationReviewEvidence/add': 'trackerInstallationReviewEvidence/add-action',
	'GET /trackerInstallationReviewEvidence/find': 'trackerInstallationReviewEvidence/find-action',
	'DELETE /trackerInstallationReviewEvidence/delete': 'trackerInstallationReviewEvidence/delete-action',
	'GET /trackerInstallationReviewEvidence/list': 'trackerInstallationReviewEvidence/list-action',
	'PUT /trackerInstallationReviewEvidence/update': 'trackerInstallationReviewEvidence/update-action',
	'PUT /trackerInstallationReviewEvidence/disable': 'trackerInstallationReviewEvidence/disable-action',


	//Acciones de deletedSupply
	'POST /deletedSupply/add': 'deletedSupply/add-action',
	'GET /deletedSupply/find': 'deletedSupply/find-action',
	'GET /deletedSupply/list': 'deletedSupply/list-action',

	//Acciones de monitoringDevice
	'POST /monitoringDevice/add': 'monitoringDevice/add-action',
	'DELETE /monitoringDevice/delete': 'monitoringDevice/delete-action',
	'PUT /monitoringDevice/disable': 'monitoringDevice/disable-action',
	'GET /monitoringDevice/find': 'monitoringDevice/find-action',
	'GET /monitoringDevice/list': 'monitoringDevice/list-action',
	'PUT /monitoringDevice/update': 'monitoringDevice/update-action',

	//Acciones de ticket
	'POST /ticket/add': 'ticket/add-action',
	'DELETE /ticket/delete': 'ticket/delete-action',
	'PUT /ticket/disable': 'ticket/disable-action',
	'GET /ticket/find': 'ticket/find-action',
	'GET /ticket/list': 'ticket/list-action',
	'PUT /ticket/update': 'ticket/update-action',

	//Acciones de ticketMonitoringDevice
	'POST /ticketMonitoringDevice/add': 'ticketMonitoringDevice/add-action',
	'DELETE /ticketMonitoringDevice/delete': 'ticketMonitoringDevice/delete-action',
	'PUT /ticketMonitoringDevice/disable': 'ticketMonitoringDevice/disable-action',
	'GET /ticketMonitoringDevice/find': 'ticketMonitoringDevice/find-action',
	'GET /ticketMonitoringDevice/list': 'ticketMonitoringDevice/list-action',
	'PUT /ticketMonitoringDevice/update': 'ticketMonitoringDevice/update-action',
	//Acciones de dependencia
	'POST /dependency/add': 'dependency/add-action',
	'DELETE /dependency/delete': 'dependency/delete-action',
	'PUT /dependency/disable': 'dependency/disable-action',
	'GET /dependency/find': 'dependency/find-action',
	'GET /dependency/list': 'dependency/list-action',
	'PUT /dependency/update': 'dependency/update-action',

	//Acciones de categorias de dependencia
	
	'GET /dependencyCategory/list': 'dependencyCategory/list-action',

	//Acciones de telefonos de dependencia
	'POST /dependencyPhone/add': 'dependencyPhone/add-action',
	'DELETE /dependencyPhone/delete': 'dependencyPhone/delete-action',
	'PUT /dependencyPhone/disable': 'dependencyPhone/disable-action',
	'GET /dependencyPhone/find': 'dependencyPhone/find-action',
	'GET /dependencyPhone/list': 'dependencyPhone/list-action',
	'PUT /dependencyPhone/update': 'dependencyPhone/update-action',

	//Acciones de datos de contacto de los telefonos de dependencia
	'POST /dependencyPhoneContact/add': 'dependencyPhoneContact/add-action',
	'DELETE /dependencyPhoneContact/delete': 'dependencyPhoneContact/delete-action',
	'PUT /dependencyPhoneContact/disable': 'dependencyPhoneContact/disable-action',
	'GET /dependencyPhoneContact/find': 'dependencyPhoneContact/find-action',
	'GET /dependencyPhoneContact/list': 'dependencyPhoneContact/list-action',
	'PUT /dependencyPhoneContact/update': 'dependencyPhoneContact/update-action',

	//Acciones de incidecia
	'POST /incidence/add': 'incidence/add-action',
	'DELETE /incidence/delete': 'incidence/delete-action',
	'PUT /incidence/disable': 'incidence/disable-action',
	'GET /incidence/find': 'incidence/find-action',
	'GET /incidence/list': 'incidence/list-action',
	'PUT /incidence/update': 'incidence/update-action',

	//Acciones de evidencia de incidencia
	'POST /incidenceEvidence/add': 'incidenceEvidence/add-action',
	'DELETE /incidenceEvidence/delete': 'incidenceEvidence/delete-action',
	'PUT /incidenceEvidence/disable': 'incidenceEvidence/disable-action',
	'GET /incidenceEvidence/find': 'incidenceEvidence/find-action',
	'GET /incidenceEvidence/list': 'incidenceEvidence/list-action',
	'PUT /incidenceEvidence/update': 'incidenceEvidence/update-action',

	//Acciones de dispositivos involucrdos en la incidencia
	'POST /incidenceInvolvedDevice/add': 'incidenceInvolvedDevice/add-action',
	'DELETE /incidenceInvolvedDevice/delete': 'incidenceInvolvedDevice/delete-action',
	'PUT /incidenceInvolvedDevice/disable': 'incidenceInvolvedDevice/disable-action',
	'GET /incidenceInvolvedDevice/find': 'incidenceInvolvedDevice/find-action',
	'GET /incidenceInvolvedDevice/list': 'incidenceInvolvedDevice/list-action',
	'PUT /incidenceInvolvedDevice/update': 'incidenceInvolvedDevice/update-action',

	//Acciones de telefonos de coordinacion de incidencia
	'POST /incidenceCoordination/add': 'incidenceCoordination/add-action',
	'DELETE /incidenceCoordination/delete': 'incidenceCoordination/delete-action',
	'PUT /incidenceCoordination/disable': 'incidenceCoordination/disable-action',
	'GET /incidenceCoordination/find': 'incidenceCoordination/find-action',
	'GET /incidenceCoordination/list': 'incidenceCoordination/list-action',
	'PUT /incidenceCoordination/update': 'incidenceCoordination/update-action',

	//Acciones de telefonos de coordinacion de ticket
	'POST /ticketCoordination/add': 'ticketCoordination/add-action',
	'DELETE /ticketCoordination/delete': 'ticketCoordination/delete-action',
	'PUT /ticketCoordination/disable': 'ticketCoordination/disable-action',
	'GET /ticketCoordination/find': 'ticketCoordination/find-action',
	'GET /ticketCoordination/list': 'ticketCoordination/list-action',
	'PUT /ticketCoordination/update': 'ticketCoordination/update-action',

	//Acciones de respaldo de dispositivos de monitoreo en incidencia
	'POST /incidenceBackDevice/add': 'incidenceBackDevice/add-action',
	'DELETE /incidenceBackDevice/delete': 'incidenceBackDevice/delete-action',
	'PUT /incidenceBackDevice/disable': 'incidenceBackDevice/disable-action',
	'GET /incidenceBackDevice/find': 'incidenceBackDevice/find-action',
	'GET /incidenceBackDevice/list': 'incidenceBackDevice/list-action',
	'PUT /incidenceBackDevice/update': 'incidenceBackDevice/update-action',


	//acciones de dashboard
	'GET /dashboard/model-brand': 'dashboard/model-brand-action',
	'GET /dashboard/supply-status': 'dashboard/supply-status-action',
	'GET /dashboard/category': 'dashboard/category-action',
	'GET /dashboard/active-clients': 'dashboard/active-clients-action',
	'GET /dashboard/quotation-sale': 'dashboard/quotation-sale-action',
	'GET /dashboard/sale-orders': 'dashboard/sale-orders-action',

	//Acciones de registros de venta
	'POST /quotationSaleRecord/add': 'quotationSaleRecord/add-action',
	'DELETE /quotationSaleRecord/delete': 'quotationSaleRecord/delete-action',
	'PUT /quotationSaleRecord/disable': 'quotationSaleRecord/disable-action',
	'GET /quotationSaleRecord/find': 'quotationSaleRecord/find-action',
	'GET /quotationSaleRecord/list': 'quotationSaleRecord/list-action',
	'PUT /quotationSaleRecord/update': 'quotationSaleRecord/update-action',


	//Acciones de asociación de rastreador con servicio
	'POST /associationTrackerService/add': 'associationTrackerService/add-action',
	'DELETE /associationTrackerService/delete': 'associationTrackerService/delete-action',
	'PUT /associationTrackerService/disable': 'associationTrackerService/disable-action',
	'GET /associationTrackerService/find': 'associationTrackerService/find-action',
	'GET /associationTrackerService/list': 'associationTrackerService/list-action',
	'PUT /associationTrackerService/update': 'associationTrackerService/update-action',



};

