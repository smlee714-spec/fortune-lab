import type { PremiumPlanId } from "@/lib/premium/types";

export interface PendingPaymentOrder {
  orderId: string;
  planId: PremiumPlanId;
  amount: number;
  customerKey: string;
  createdAt: number;
  expiresAt: number;
}

const ORDER_TTL_MS = 30 * 60 * 1000;

/** 개발·테스트용 인메모리 저장소 — 운영 시 Redis/DB로 교체 */
const pendingOrders = new Map<string, PendingPaymentOrder>();

function purgeExpiredOrders() {
  const now = Date.now();
  for (const [orderId, order] of pendingOrders) {
    if (order.expiresAt <= now) {
      pendingOrders.delete(orderId);
    }
  }
}

export function createOrderId(planId: PremiumPlanId): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `order_${planId}_${Date.now()}_${random}`;
}

export function savePendingOrder(order: PendingPaymentOrder): void {
  purgeExpiredOrders();
  pendingOrders.set(order.orderId, order);
}

export function consumePendingOrder(orderId: string): PendingPaymentOrder | null {
  purgeExpiredOrders();
  const order = pendingOrders.get(orderId);
  if (!order) return null;

  if (order.expiresAt <= Date.now()) {
    pendingOrders.delete(orderId);
    return null;
  }

  pendingOrders.delete(orderId);
  return order;
}

export function getPendingOrder(orderId: string): PendingPaymentOrder | null {
  purgeExpiredOrders();
  const order = pendingOrders.get(orderId);
  if (!order || order.expiresAt <= Date.now()) {
    pendingOrders.delete(orderId);
    return null;
  }
  return order;
}

export function createPendingOrder(params: {
  planId: PremiumPlanId;
  amount: number;
  customerKey: string;
}): PendingPaymentOrder {
  const now = Date.now();
  const order: PendingPaymentOrder = {
    orderId: createOrderId(params.planId),
    planId: params.planId,
    amount: params.amount,
    customerKey: params.customerKey,
    createdAt: now,
    expiresAt: now + ORDER_TTL_MS,
  };

  savePendingOrder(order);
  return order;
}
