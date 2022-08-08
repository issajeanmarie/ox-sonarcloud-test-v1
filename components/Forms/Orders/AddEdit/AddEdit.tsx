import { FC } from "react";
import Input from "../../../Shared/Input";
import Image from "next/image";
import Button from "../../../../components/Shared/Button";

interface AddEditOrderProps {
  mode: "edit" | "add";
  title: string;
}

const AddEditOrder: FC<AddEditOrderProps> = ({ title }) => {
  return (
    <div>
      <div className="text-lg font-bold text-ox-dark mb-10">{title}</div>

      {/*  Client's details */}
      <div className="mb-14">
        <div className="font-extralight text-[15px] mb-6">Client details</div>
        <div className="flex gap-10">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="heading2">Client name</span>
              <span className="link animate">New client</span>
            </div>
            <div>
              <Input
                name="name"
                type="select"
                placeholder="Select client"
                options={[{ label: "RTC", value: 1 }]}
              />
            </div>
          </div>
          <div className="flex-1">
            <Input
              name="branch"
              type="select"
              placeholder="Select branch"
              label="Branch"
              options={[{ label: "RTC", value: 1 }]}
            />
          </div>
        </div>
      </div>

      {/* Order details */}

      <div className="mb-14">
        <div className="font-extralight text-[15px] mb-10">Order details</div>
        <div className="flex gap-10 mb-5">
          <div className="flex-1">
            <div>
              <Input
                name="date"
                type="date"
                label="Date"
                options={[{ label: "RTC", value: 1 }]}
                suffixIcon={
                  <Image
                    src="/icons/ic-actions-calendar.svg"
                    alt="Calendar icon"
                    width={18}
                    height={18}
                  />
                }
              />
            </div>
          </div>
          <div className="flex-1">
            <Input
              name="branch"
              type="text"
              placeholder="Search location"
              label="Stop 1"
            />
          </div>
        </div>
        <div className="flex gap-10 mb-5">
          <div className="flex-1">
            <div>
              <Input
                name="category"
                type="select"
                label="Category"
                placeholder="Select category"
                options={[{ label: "RTC", value: 1 }]}
              />
            </div>
          </div>
          <div className="flex-1">
            <Input
              name="branch"
              type="text"
              placeholder="00"
              label="Expected weight"
              suffixIcon="KGs"
            />
          </div>
        </div>
        <div className="flex gap-10 mb-5">
          <div className="flex-1">
            <div>
              <Input
                name="plan"
                type="select"
                label="Plan"
                placeholder="Select plan"
                options={[{ label: "RTC", value: 1 }]}
              />
            </div>
          </div>
          <div className="flex-1">
            <Input
              name="rate"
              type="text"
              placeholder="00"
              label="Rate"
              suffixIcon="Rwf"
            />
          </div>
        </div>
      </div>

      {/* Truck details */}

      <div className="mb-14">
        <div className="font-extralight text-[15px] mb-10">Truck details</div>
        <div className="flex gap-10 mb-5">
          <div className="flex-1">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="heading2">Truck</span>
                <span className="link animate">New truck</span>
              </div>
              <div>
                <Input
                  name="name"
                  type="select"
                  placeholder="Select truck"
                  options={[{ label: "RTC", value: 1 }]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="heading2">Driver</span>
                <span className="link animate">New driver</span>
              </div>
              <div>
                <Input
                  name="name"
                  type="select"
                  placeholder="Select driver"
                  options={[{ label: "RTC", value: 1 }]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 mb-5">
          <div className="flex-1">
            <div>
              <Input
                name="depot"
                type="select"
                label="Depot"
                placeholder="Select depot"
                options={[{ label: "RTC", value: 1 }]}
              />
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Stop details */}

      <div className="mb-14">
        <div className="font-extralight text-[15px] mb-10">Stop details</div>
        <div className="flex items-center mb-10">
          <div className="flex-1 text-sm flex items-center gap-3">
            <div className="text-gray-400">1</div>
            <div className="heading2">Musanze, Kanzenze KK 000 St 7</div>
          </div>
          <div>
            <Image
              className="pointer"
              width={12}
              height={12}
              src="/icons/ic-actions-close-simple.svg"
              alt="Close icon"
            />
          </div>
        </div>
        <div className="flex items-end gap-10">
          <div className="flex-1">
            <Input
              name="stop"
              type="text"
              placeholder="Search location"
              label="Add stop"
            />
          </div>
          <div className="w-[142px]">
            <Button type="secondary">ADD STOP</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditOrder;
