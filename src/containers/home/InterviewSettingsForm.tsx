import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import * as Yup from "yup";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  formData: IInterViewSettings;
  setFormData: React.Dispatch<React.SetStateAction<IInterViewSettings>>;
}> = ({ handleTab, formData, setFormData }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Job Title is required"),
      interviewDuration: Yup.string().required("Job Details is required"),
      interviewLanguage: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
      setFormData(values);
    },
    validateOnChange: true,
  });

  React.useEffect(() => {
    console.log("Form values updated", values); // Check if values are being updated
    setFormData(values);
  }, [values, setFormData, errors]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box position="relative" zIndex={3}>
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
      </Box>
      
      <Box position="relative" zIndex={2} mt="20px">
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
      </Box>

      <Box position="relative" zIndex={1} mt="20px">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
      </Box>

      <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
        <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
          Previous
        </Button>
        <Button colorScheme="red" type="submit">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default InterviewDetailsForm;
