import React from "react";
import { useForm } from "react-hook-form";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  return (
    <div>
      <DashboardHeading
        title="New User"
        desc="Add new user to system with your admin permission"
      ></DashboardHeading>
      <div className="w-full flex items-center justify-center mb-10">
        <div className="w-[180px] h-[180px] ">
          <ImageUpload
            className="w-full h-full !rounded-full "
            imageURL={imageURL}
            progress={progressUpload}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
      </div>
      <form action="" onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="grid-addnew">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
              required
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputToggleIcon control={control}></InputToggleIcon>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                name="status"
                value={userStatus.ACTIVE}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                control={control}
              >
                Active
              </Radio>
              <Radio
                name="status"
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
                control={control}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                value={userStatus.BAN}
                checked={Number(watchStatus) === userStatus.BAN}
                control={control}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="role">Role</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                name="role"
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
                control={control}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
                control={control}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
                control={control}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="btn-center"
          width="180px"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
