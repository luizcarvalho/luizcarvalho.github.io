pending_posts = [
  'startup_talk','startup_tocantins','v_sa_unitins_rails','fortes_2015_rails_startup','10_flisol_pmw',
  'v_workshop_si_catolica','melck','claudia'
].freeze

images_folder = './_assets/images/portfolio'.freeze

task :create_pending_posts do
  pending_posts.each do |image|
    file = "#{images_folder}/#{image}"
    if File.exists?("#{file}.jpg")
      puts 'convertendo jpg em png'
      system("convert #{file}.jpg #{file}.png")
      puts 'removendo jpg antigo'
      # system("rm #{file}.jpg")
    end
    system "bundle exec rake post title='#{image}'"
  end
end

