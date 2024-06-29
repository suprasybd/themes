import { createFileRoute } from '@tanstack/react-router';
import { getCategoriesOptions } from '@web/components/NavBar/api';
import PendingComponent from '@web/components/PendingComponent/PendingComponent';
import Home from '@web/pages/home/Home';
import {
  getHomeSectionsOptions,
  getHomesectionsProductsOptions,
} from '@web/pages/home/api';

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    const sectionList = await queryClient.ensureQueryData(
      getHomeSectionsOptions()
    );
    const b = queryClient.ensureQueryData(getCategoriesOptions());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allPromsie: Array<any> = [b];

    const sectionIds = sectionList.Data.map((sec) => sec.Id);
    sectionIds.forEach(async (secId) => {
      allPromsie.push(
        queryClient.ensureQueryData(getHomesectionsProductsOptions(secId))
      );
    });

    return Promise.all(allPromsie);
  },

  pendingComponent: () => <PendingComponent hScreen />,

  component: () => (
    <div>
      <Home />
    </div>
  ),
});
