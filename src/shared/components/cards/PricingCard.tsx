import { stripeSubscribe } from "@/app/actions/stripe.subscribe";
import { GrowPlan, freePlan, scalePlan } from "@/app/configs/constant";
import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const PricingCard = ({ active }: { active: string }) => {


  const { user } = useUser();
  const history = useRouter();

  const handleSubscription = async ({ price }: { price: string }) => {
    await stripeSubscribe({ price, userId: user?.id! }).then(
      (res: any) => {
        history.push(res);
      }
    );
  };

  const renderPlanFeatures = (plan: PlanType[]) =>
    plan.map((feature, index) => (
      <div key={index} className="flex w-full items-center py-4">
        <span className="text-xl">{ICONS.right}</span>
        <p className="pl-2 text-lg">{feature.title}</p>
      </div>
    ));

  const renderPlan = (title: string, price: string, features: PlanType[], trialText: string) => (
    <div className="md:w-[420px] bg-white rounded p-5 my-5 md:my-0 shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="33" fill="string" className="mb-4">
        <path
          fill="#fff"
          stroke="#3843D0"
          strokeWidth="3"
          d="M33.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L2.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 13.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"
        />
      </svg>
      <h5 className=" uppercase text-cyber-ink text-3xl pb-8 border-b border-[#000]">
        {title}
      </h5>
      <br />
      <div className="border-b pb-8 border-[#000]">
        <h5 className=" uppercase text-cyber-ink text-3xl">{price}</h5>
        <p className="text-lg">Billed {active}</p>
      </div>
      <div className="pt-5">
        <p className="text-xl">What's included...</p>
      </div>
      {renderPlanFeatures(features)}
      <br />
      <Button color="primary" className="w-full text-xl !py-6" onClick={() => {
        if(title === 'Grow'){
          handleSubscription({
            price:
              active === "Monthly"
                ? "price_1PeeHzSAfkl2Kg8YQU04Aggg"
                : "price_1PeeHzSAfkl2Kg8YQU04Aggg",
          })
        }
        if(title === 'Scale'){
          handleSubscription({
            price:
              active === "Monthly"
                ? "price_1PeeJwSAfkl2Kg8YWJwZzES6"
                : "price_1PeeJwSAfkl2Kg8YWJwZzES6",
          })
        }
      }}>
        Get Started
      </Button>
      <p className="pt-1 opacity-[.7] text-center">{trialText}</p>
    </div>
  );

  return (
    <div className="w-full md:flex items-start justify-around py-8">
      {renderPlan("Launch", "$0", freePlan, "30-day free trial of Scale features, then free forever")}
      {renderPlan(
        "Grow",
        `$${active === "Monthly" ? "49" : "42"} /month`,
        GrowPlan,
        `30-day free trial of Scale features, then $${active === "Monthly" ? "42" : "49"}/mo`
      )}
      {renderPlan(
        "Scale",
        `$${active === "Monthly" ? "55" : "84"} /month`,
        scalePlan,
        `30-day free trial of Scale features, then $${active === "Monthly" ? "55" : "84"}/mo`
      )}
    </div>
  );
};

export default PricingCard;
