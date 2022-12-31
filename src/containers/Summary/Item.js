import React from "react";

const Item = ({ intention, handleInputChange }) => {
  return (
    <>
      <InputContainer error={intention.name.error}>
        <Editable>
          <Input
            name="name"
            type="text"
            placeholder="Name*"
            value={intention.name.value}
            handleChange={handleInputChange(intention.id)}
          />
        </Editable>
      </InputContainer>
    </>
  );
};
