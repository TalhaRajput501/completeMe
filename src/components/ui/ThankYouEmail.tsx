import { Section, Heading, Text, Img, Tailwind } from "react-email";


export default function ThankYouEmail() {
  
  return (

    <Tailwind>
      <Section className="bg-slate-50 py-[16px] text-center">
        <Heading as="h1" className="mb-0 font-semibold text-[30px] leading-[36px] text-slate-800">
          Thank you for shopping with us!
        </Heading>
        <Section className="my-[16px] rounded-[8px] border border-slate-200 border-solid bg-white p-[16px] pt-0">
          <table className="mb-[16px]" width="100%">
            <tr>
              <th className="border-0 border-slate-200 border-b border-solid py-[8px]">
                &nbsp;
              </th>
              <th
                align="left"
                className="border-0 border-slate-200 border-b border-solid py-[8px] text-slate-500"
                colSpan={6}
              >
                <Text className="font-semibold">Product</Text>
              </th>
              <th
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px] text-slate-500"
              >
                <Text className="font-semibold">Quantity</Text>
              </th>
              <th
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px] text-slate-500"
              >
                <Text className="font-semibold">Price</Text>
              </th>
            </tr>
            <tr>
              <td className="border-0 border-slate-200 border-b border-solid py-[8px]">
                <Img
                  alt="Braun Classic Watch"
                  className="rounded-[8px] object-cover"
                  height={110}
                  src="https://react.email/static/braun-classic-watch.jpg"
                />
              </td>
              <td
                align="left"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
                colSpan={6}
              >
                <Text className="text-slate-700">Classic Watch</Text>
              </td>
              <td
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
              >
                <Text className="text-slate-700">1</Text>
              </td>
              <td
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
              >
                <Text className="text-slate-700">$210.00</Text>
              </td>
            </tr>
            <tr>
              <td className="border-0 border-slate-200 border-b border-solid py-[8px]">
                <Img
                  alt="Braun Analogue Clock"
                  className="rounded-[8px] object-cover"
                  height={110}
                  src="https://react.email/static/braun-analogue-clock.jpg"
                />
              </td>
              <td
                align="left"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
                colSpan={6}
              >
                <Text className="text-slate-700">Analogue Clock</Text>
              </td>
              <td
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
              >
                <Text className="text-slate-700">1</Text>
              </td>
              <td
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
              >
                <Text className="text-slate-700">$40.00</Text>
              </td>
            </tr>
            <tr className="bg-blue-50">
              <td className="border-0 border-slate-200 border-b border-solid py-[8px]"></td>
              <td
                align="right"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
                colSpan={6}
              >
                <Text className="font-semibold text-slate-800">Total Bill</Text>
              </td>
              <td className="border-0 border-slate-200 border-b border-solid py-[8px]"></td>
              <td
                align="center"
                className="border-0 border-slate-200 border-b border-solid py-[8px]"
              >
                <Text className="font-semibold text-blue-700">$250.00</Text>
              </td>
            </tr>
          </table>
        </Section>
      </Section>
    </Tailwind>
  )
}
