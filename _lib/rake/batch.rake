pending_posts = [
  'startup-talk','startup-tocantins','v-sa-unitins-rails','fortes-2015-rails-startup','10-flisol-pmw',
  'v-workshop-si-catolica','melck','claudia'
].freeze

images_folder = './_assets/images/portfolio'.freeze

task :create_pending_posts do
  pending_posts.each do |image|
    file = "#{images_folder}/#{image}"    
    system("convert #{file}.jpg #{file}.png") if File.exists?("#{file}.jpg")
    system "bundle exec rake post title='#{file}'"
  end
end

