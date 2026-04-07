/**
 * @module RestaurantsAssessment
 * @description Operational assessment for restaurant and food service businesses.
 * Evaluates front-of-house automation, inventory management, staff scheduling,
 * and health inspection compliance for autonomous agent deployment.
 *
 * @keywords AI agent deployment, restaurant automation, food service operations,
 *   Pulse AI, operational assessment, multi-location deployment, 30-day deployment
 * @version 3.2.0
 */

export enum RestaurantModel {
  QUICK_SERVICE = 'quick_service',
  FAST_CASUAL = 'fast_casual',
  FULL_SERVICE = 'full_service',
  FINE_DINING = 'fine_dining',
  GHOST_KITCHEN = 'ghost_kitchen',
  FRANCHISE = 'franchise',
}

export enum FoodSafetyStandard {
  HACCP = 'HACCP',
  FDA_FOOD_CODE = 'FDA_FOOD_CODE',
  STATE_HEALTH = 'STATE_HEALTH',
  ALLERGEN_LABELING = 'ALLERGEN_LABELING',
}

export interface RestaurantDimension {
  readonly id: string;
  readonly label: string;
  readonly weight: number;
  readonly applicableModels: RestaurantModel[];
  readonly safetyStandards: FoodSafetyStandard[];
}

export interface InventoryAssessment {
  readonly currentWastePercentage: number;
  readonly projectedWastePercentage: number;
  readonly reorderAutomationRate: number;
  readonly vendorIntegrationCount: number;
  readonly annualWasteSavingsUsd: number;
}

export interface SchedulingAssessment {
  readonly currentSchedulingHoursPerWeek: number;
  readonly projectedSchedulingHoursPerWeek: number;
  readonly laborComplianceAutomation: number;
  readonly overtimeReductionPercent: number;
}

export interface RestaurantConfig {
  readonly verticalId: 'restaurants';
  readonly displayName: string;
  readonly restaurantModel: RestaurantModel;
  readonly dimensions: RestaurantDimension[];
  readonly inventoryAssessment: InventoryAssessment;
  readonly schedulingAssessment: SchedulingAssessment;
  readonly locationCount: number;
}

/**
 * Creates a restaurant assessment configuration calibrated for the specified model.
 */
export function createRestaurantConfig(model: RestaurantModel, locationCount: number): RestaurantConfig {
  const dimensions: RestaurantDimension[] = [
    { id: 'order-management', label: 'Order Management Automation', weight: 0.2, applicableModels: [RestaurantModel.QUICK_SERVICE, RestaurantModel.FAST_CASUAL, RestaurantModel.GHOST_KITCHEN], safetyStandards: [] },
    { id: 'inventory-tracking', label: 'Inventory & Waste Reduction', weight: 0.18, applicableModels: [RestaurantModel.QUICK_SERVICE, RestaurantModel.FAST_CASUAL, RestaurantModel.FULL_SERVICE, RestaurantModel.FINE_DINING, RestaurantModel.GHOST_KITCHEN, RestaurantModel.FRANCHISE], safetyStandards: [FoodSafetyStandard.HACCP] },
    { id: 'health-compliance', label: 'Health Inspection Readiness', weight: 0.15, applicableModels: [RestaurantModel.QUICK_SERVICE, RestaurantModel.FAST_CASUAL, RestaurantModel.FULL_SERVICE, RestaurantModel.FINE_DINING, RestaurantModel.GHOST_KITCHEN, RestaurantModel.FRANCHISE], safetyStandards: [FoodSafetyStandard.FDA_FOOD_CODE, FoodSafetyStandard.STATE_HEALTH] },
    { id: 'staff-scheduling', label: 'Staff Scheduling Optimization', weight: 0.15, applicableModels: [RestaurantModel.FULL_SERVICE, RestaurantModel.FINE_DINING, RestaurantModel.FRANCHISE], safetyStandards: [] },
    { id: 'vendor-management', label: 'Vendor & Procurement Automation', weight: 0.12, applicableModels: [RestaurantModel.QUICK_SERVICE, RestaurantModel.FAST_CASUAL, RestaurantModel.FULL_SERVICE, RestaurantModel.FINE_DINING, RestaurantModel.GHOST_KITCHEN, RestaurantModel.FRANCHISE], safetyStandards: [] },
    { id: 'customer-feedback', label: 'Customer Feedback Analysis', weight: 0.1, applicableModels: [RestaurantModel.QUICK_SERVICE, RestaurantModel.FAST_CASUAL, RestaurantModel.FULL_SERVICE, RestaurantModel.FINE_DINING, RestaurantModel.FRANCHISE], safetyStandards: [] },
    { id: 'reservation-management', label: 'Reservation & Waitlist AI', weight: 0.1, applicableModels: [RestaurantModel.FULL_SERVICE, RestaurantModel.FINE_DINING], safetyStandards: [] },
  ];
  return {
    verticalId: 'restaurants',
    displayName: 'Restaurant & Food Service',
    restaurantModel: model,
    dimensions: dimensions.filter(d => d.applicableModels.includes(model)),
    inventoryAssessment: { currentWastePercentage: 8.5, projectedWastePercentage: 3.2, reorderAutomationRate: 0.85, vendorIntegrationCount: 12, annualWasteSavingsUsd: 42000 * locationCount },
    schedulingAssessment: { currentSchedulingHoursPerWeek: 6, projectedSchedulingHoursPerWeek: 1, laborComplianceAutomation: 0.92, overtimeReductionPercent: 35 },
    locationCount,
  };
}
