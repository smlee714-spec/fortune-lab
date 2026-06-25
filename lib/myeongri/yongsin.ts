import type { Element } from "@/lib/types";
import {
  BRANCH_ELEMENTS,
  ELEMENT_CONTROLS,
  ELEMENT_GENERATES,
  STEM_ELEMENTS,
} from "./constants";
import type { Stem } from "./constants";
import type { FourPillarsResult, OhaengResult, YongsinResult } from "./types";

function supportingElements(dayEl: Element): Element[] {
  const mother = (Object.entries(ELEMENT_GENERATES) as [Element, Element][]).find(
    ([, child]) => child === dayEl
  )?.[0];
  return mother ? [mother, dayEl] : [dayEl];
}

function drainingElements(dayEl: Element): Element[] {
  const child = ELEMENT_GENERATES[dayEl];
  const controlled = ELEMENT_CONTROLS[dayEl];
  const controller = (Object.entries(ELEMENT_CONTROLS) as [Element, Element][]).find(
    ([, target]) => target === dayEl
  )?.[0];
  return controller ? [child, controlled, controller] : [child, controlled];
}

export function computeYongsin(
  pillars: FourPillarsResult,
  ohaeng: OhaengResult
): YongsinResult {
  const dayEl = STEM_ELEMENTS[pillars.dayMaster as Stem] as Element;
  const monthEl = BRANCH_ELEMENTS[pillars.month.branch];
  const monthSupports = supportingElements(dayEl).includes(monthEl);

  const supportTotal = supportingElements(dayEl).reduce(
    (s, e) => s + (ohaeng.counts.find((c) => c.element === e)?.count ?? 0),
    0
  );
  const drainTotal = drainingElements(dayEl).reduce(
    (s, e) => s + (ohaeng.counts.find((c) => c.element === e)?.count ?? 0),
    0
  );

  const strengthScore = supportTotal - drainTotal + (monthSupports ? 2 : -1);
  let strength: YongsinResult["strength"];
  if (strengthScore >= 2) strength = "신강";
  else if (strengthScore <= -2) strength = "신약";
  else strength = "중화";

  let yongsin: Element;
  let huisin: Element[];
  let gisin: Element[];

  if (strength === "신강" || strength === "중화") {
    const candidates = drainingElements(dayEl);
    yongsin = candidates[2];
    huisin = [candidates[0], candidates[1]];
    gisin = supportingElements(dayEl);
  } else {
    yongsin = supportingElements(dayEl)[0];
    huisin = [dayEl];
    gisin = drainingElements(dayEl);
  }

  const reasoning =
    strength === "신강"
      ? `월령·오행 누적으로 일간 ${pillars.dayMaster}(${dayEl})이 신강합니다. 극·설·泄 기운(${yongsin}, ${huisin.join(", ")})을 용·희로 봅니다.`
      : strength === "신약"
        ? `일간 ${pillars.dayMaster}(${dayEl})이 신약합니다. 생·扶 기운(${yongsin}, ${huisin.join(", ")})을 용·희로 봅니다.`
        : `일간 ${pillars.dayMaster}(${dayEl})이 중화에 가깝습니다. 균형을 위해 ${yongsin} 기운을 용신으로 봅니다.`;

  return {
    strength,
    strengthScore,
    yongsin,
    huisin,
    gisin,
    reasoning,
  };
}
